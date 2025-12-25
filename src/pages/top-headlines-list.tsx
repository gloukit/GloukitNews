import NewsCard from "@/components/news-card";
import { useCategoryQuery } from "@/hooks/use-newsQueries";
import { ErrorEmpty, SkeletonList } from "@/components/skelton-error";
import { Empty, EmptyDescription, EmptyHeader, EmptyTitle } from "@/components/ui/empty";
import { Newspaper, Undo2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";


export default function TopHeadlines(){
    const navigate = useNavigate();
    const {data,isLoading,error,fetchNextPage,hasNextPage,refetch} = useCategoryQuery("general") ;
    const articles = data?.pages
                          .flatMap(p => p?.articles ?? []) 
                          ?? [] ;


    if(isLoading){return <SkeletonList/>}
    if(error){return <ErrorEmpty error={error} handleRefresh={()=>refetch()}/>}
    if(articles.length===0 ){
        return (
            <Empty>
                <EmptyHeader>
                    <EmptyTitle className="flex items-end gap-2">
                        <Newspaper size={45}/>
                        <p className="text-xl">No Result</p>
                    </EmptyTitle>
                    <EmptyDescription className="my-5">
                        <Button variant="outline" className="w-[150px]" onClick={()=>navigate(-1)}>
                            Go Back
                            <Undo2/>
                        </Button>
                    </EmptyDescription>
                </EmptyHeader>
            </Empty>      
        )
    }
    
    return (
        <div>
            <h3>Top Headlines</h3>
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