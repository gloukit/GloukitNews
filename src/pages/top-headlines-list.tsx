import NewsCard from "@/components/news-card";
import { useNewsQuery } from "@/hooks/use-newsQueries";
import { ErrorEmpty, SkeletonList } from "@/components/skelton-error";
import { Empty, EmptyDescription, EmptyHeader, EmptyTitle } from "@/components/ui/empty";
import { Newspaper, Undo2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";


export default function TopHeadlines(){
    const navigate = useNavigate();
    const {data,isLoading,error,refetch} = useNewsQuery("general");
    const articles = data?.articles ?? [];

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
            <div className="flex gap-2 items-center">
                <h3 className="text-lg">Top Headlines</h3>
            </div>
            
            <div>
                {articles && articles.length>0 && articles.map((article)=>(
                    <NewsCard {...article} key={article.url}/>
                ))}
            </div>
        </div>
    )
}