import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocalStorage } from "./use-localStorage";

export interface SearchItemType{
    searchItem:string;
    id:string; 
    searchedAt:number;
}


export function useSearchHistory(){
    const queryClient = useQueryClient();
    const [history,setHistory] = useLocalStorage("searchHistory",[]);

    const historyQuery = useQuery({
        queryKey:["search-history"],
        queryFn:()=>history,
        initialData:history,
    });

    const addToHistory = useMutation({
        mutationFn : async (search:string) =>{
            const newSearch:SearchItemType = {
                searchItem:search,
                id:`${search}-${Date.now()}`,
                searchedAt:Date.now(),
            }

            const filteredHistory = history.filter((item:SearchItemType) => item.searchItem !== search);

            const newHistory = [newSearch,...filteredHistory].slice(0,5);

            setHistory(newHistory);
            return newHistory;
        },
        
        onSuccess : (newHistory)=>{
            queryClient.setQueryData(["search-history"],newHistory);
        }
    })

    const removeHistory = useMutation({
        mutationFn : async (search:string) => {
            const newHistory = history.filter((item:SearchItemType) => item.searchItem !== search);
            setHistory(newHistory);
            return newHistory;
        },
        onSuccess: (newHistory)=>{
            queryClient.setQueryData(["search-history"], newHistory );
        }
    })

    const clearHistory = useMutation({
        mutationFn: async()=>{
            setHistory([]);
            return [];
        },
        onSuccess : ()=>{
            queryClient.setQueryData(["search-history"],[]);
        }
    })


    return {
        history:historyQuery.data ?? [],
        addToHistory,
        removeHistory,
        clearHistory
    }
}