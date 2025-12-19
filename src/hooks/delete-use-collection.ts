import type { ArticleDataType } from "@/api/types";
import { useLocalStorage } from "./use-localStorage";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

type DetailType = Omit<ArticleDataType,"source"|"description"|"content">;
interface CollectionType {
    id:string,
    detail:DetailType
}

//【废：根据chatGPT的方法，继续修改，还是用不了！！！】

export function useCollection(key:string){
    const queryClient = useQueryClient();

    /*从本地请求数据*/
    const [storedValue,setStoredValue] = useLocalStorage<CollectionType[]>(key,[]);


    /*包装成可缓存、可订阅的数据源*/
    const collectionsQuery = useQuery({
        queryKey:[key],
        queryFn:() => storedValue,
        initialData:storedValue,
        staleTime:Infinity,
    });

    //读取最新的缓存值
    const getCurrent = useCallback(()=>{
        return queryClient.getQueryData<CollectionType[]>([key]) ?? storedValue ?? [];
    },[queryClient,storedValue]);


    /*添加：使用useMutation修改本地数据 */
    const add = useMutation({
        mutationFn: async (article:DetailType) => {
            //读取最新的缓存值
            const current = queryClient.getQueryData<CollectionType[]>([key]) ?? storedValue ?? [];

            const newCollection:CollectionType = {
                id:article.url,
                detail:article,
            };

            if(current.some((item:CollectionType)=>item.id===newCollection.id)) return current;
            const updateCollections = [newCollection,...current];
            setStoredValue(updateCollections); //在此修改localStorage里的数据
            
            return updateCollections;
        },

        //在mutationFn之前执行：读取缓存，保存快照，以备出错onError时可以回滚
        onMutate : async (article:DetailType) =>{
            await queryClient.cancelQueries([key]);
            const previous=queryClient.getQueryData<CollectionType[]>([key]) ?? storedValue ?? [];
            const newCollection:CollectionType = {id:article.url, detail:article} ;
            
            const optimistic = previous.some((item:CollectionType)=> item.id===newCollection.id ) ? previous : [newCollection,...previous];
            queryClient.setQueryData([key],optimistic);     //更新缓存数据
            
            return {previous};      //返回值是一个context对象，提供给onError
        },

        //出现错误时，回滚
        onError: (_err,_vars,context:any)=>{
            if(context?.previous){
                queryClient.setQueryData([key],context.previous);  //将onMutate返回的缓存快照数据，更新到缓存
                setStoredValue(context.previous);  //将缓存旧值写入本地
            }
        },

        //当执行完mutationFn，最新缓存以从本地存储中获取的数据为准
        onSettled : () => {
            const latest = JSON.parse(localStorage.getItem(key) ?? "[]") as CollectionType[];
            queryClient.setQueryData([key] , latest??[]);
        }
    });

    /*移除函数：先从缓存中读取最新缓存，再据此筛选*/
    const remove = useMutation({
        mutationFn: async (articleId:string) => {
            const current = queryClient.getQueryData<CollectionType[]>([key]) ?? storedValue ?? [];
            const updateCollections = current.filter((item:CollectionType) => item.id !== articleId);
           
            setStoredValue(updateCollections);
            return updateCollections
        },

        onMutate : async(articleID:string) => {
            await queryClient.cancelQueries([key]);
            const previous = queryClient.getQueryData<CollectionType[]>([key]) ?? storedValue ?? [] ;
            
            const optimistic = previous.filter((item:CollectionType) => item.id !== articleID);
            queryClient.setQueryData([key],optimistic);
            return {previous};
        },

        onError : (_err,_vars,context:any) => {
            if(context?.previous){
                queryClient.setQueryData([key],context.previous);
                setStoredValue(context.previous);
            }
        },

        onSettled : ()=>{
            const latest =JSON.parse(localStorage.getItem(key) ?? "[]") as CollectionType[];
            queryClient.setQueryData([key], latest ?? []);
        }
    });

    /*单独用于判断是否存在于数据源中*/
    const isCollection = useCallback((articleId:string)=>{
        const current = getCurrent();
        return current.some((item:CollectionType)=>item.id===articleId);
    },[getCurrent])

    return {
        collections:collectionsQuery.data,
        add,
        remove,
        isCollection
    }
}