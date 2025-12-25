import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocalStorage } from "./use-localStorage";
import type { ArticleDataType } from "@/api/types";

export interface CollectType {
    id:string;
    detail:ArticleDataType
}

export function useCollect(key:string){
    const queryClient = useQueryClient();
    const [collects,setCollects] = useLocalStorage<CollectType[]>(key,[]);

    const collectQuery = useQuery({
        queryKey:[key],
        queryFn:()=>collects,
        initialData:collects,
        staleTime:Infinity,
    })

    const add = useMutation({
        mutationFn : async(article:ArticleDataType)=>{
            const newCollect : CollectType = {
                id:article.url,
                detail:article
            };

            const exists = collects.some((item:CollectType) => item.id===newCollect.id);
            if(exists) return collects;

            const newCollects = [newCollect,...collects];
            setCollects(newCollects);
            return newCollects;
        },
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:[key]});
        }
    });

    const remove = useMutation({
        mutationFn : async (articleId:string) =>{
            const newCollects = collects.filter((item:CollectType)=>item.id!==articleId);
            setCollects(newCollects);
            return newCollects;
        } ,
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:[key]});
        }
    });

    return {
        collects:collectQuery.data,
        add,
        remove,
        isCollect:(articleId:string)=>collects.some((item:CollectType) => item.id===articleId)
    }
}