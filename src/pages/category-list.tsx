import NewsCard from "@/components/news-card";
import { ErrorEmpty, SkeletonList } from "@/components/skelton-error";
import { Button } from "@/components/ui/button";
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import { useCategoryQuery } from "@/hooks/use-newsQueries";
import { Newspaper } from "lucide-react";
import { useParams } from "react-router-dom"

export function CategoryList(){
    const {category} = useParams() ; 

    const {data,isLoading,error,fetchNextPage,hasNextPage,refetch} = useCategoryQuery(category ?? "") ;
    const articles = data?.pages
                          .flatMap(p => p?.articles ?? []) 
                          ?? [] ;
    console.log(data);

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
            <h3>News about {category}</h3>
            <div className="flex flex-col gap-4">
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