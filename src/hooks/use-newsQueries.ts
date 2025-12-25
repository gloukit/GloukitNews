import { newsAPI } from "@/api/newsClient";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

const PAGE_SIZE = 15 ;

export function useNewsQuery(category:string){
    return useQuery({
        queryKey:["news","headlines"],
        queryFn:()=>newsAPI.getHeadlines(category),
    })
}

export function useCategoryQuery(category:string | null){
    return useInfiniteQuery({
        queryKey:["news",category],
        queryFn:({pageParam=1})=>( category? newsAPI.getByCategory({
            category:category,
            page:pageParam,
            pageSize:PAGE_SIZE,
        }) :null),
        getNextPageParam: (lastPage,allPages) => {
            if (!lastPage?.articles || lastPage?.articles.length === 0) return undefined;
            return allPages.length +1 ;
        },

        initialPageParam: 1,
        enabled:!!category,
    })
}

export function useSearchQuery(query:string){
    return useInfiniteQuery ({
        queryKey:["news",query],
        queryFn:({pageParam=1}) => (query? newsAPI.searchNews({
            query:query,
            page:pageParam,
            pageSize:PAGE_SIZE,
        }):null),

        getNextPageParam: (lastPage,allPages) => {
            if(!lastPage?.articles || lastPage.articles?.length===0) return undefined;
            return allPages.length + 1 ;
        }, 

        initialPageParam:1,
        enabled:query.length>3,
    })
}