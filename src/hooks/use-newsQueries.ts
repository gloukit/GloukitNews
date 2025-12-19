import { newsAPI } from "@/api/news";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

const PAGE_SIZE = 10 ;

export function useNewsQuery(country:string){
    return useQuery({
        queryKey:["news",country],
        queryFn:()=>newsAPI.getHeadlines(country),
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