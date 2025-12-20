import NewsCard from "@/components/news-card";
import { ErrorEmpty, SkeletonList } from "@/components/skelton-error";
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import { Newspaper } from "lucide-react";
import { useSearchQuery } from "@/hooks/use-newsQueries";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function SearchResults(){
    const [searchParams] = useSearchParams();
    const q = searchParams.get("q");
    const {data,isLoading,error,fetchNextPage,hasNextPage,refetch} = useSearchQuery(q ?? "");

    const articles = data?.pages.flatMap(p => p?.articles??[]) ?? [];

    if(isLoading){return <SkeletonList/>}
    if(error){return <ErrorEmpty error={error} handleRefresh={()=>refetch()}/>}
    
    if(articles.length===0 ){
        return (
            <Empty>
                <EmptyHeader>
                    <EmptyMedia>
                        <Newspaper size={38}/>
                    </EmptyMedia>
                    <EmptyTitle>No Search Results</EmptyTitle>
                    <EmptyDescription>Try another key word.</EmptyDescription>
                </EmptyHeader>
            </Empty>      
        )
    }

    return (
        <div>
            <h3>Search Results of "{q}"</h3>
            <div>
                {articles && articles.length>0 && articles.map((article)=>(
                    <NewsCard {...article} key={article.url}/>
                ))}

                {hasNextPage?(
                    <div className="w-full flex justify-center my-4">
                        <Button onClick={()=>fetchNextPage()} className="font-bold cursor-pointer">
                            Load More
                        </Button>
                    </div>
                    ) : (
                    <div className="w-full flex justify-center my-4 font-bold">
                        No More
                    </div>
                )}
            </div>
        </div>
    )
}