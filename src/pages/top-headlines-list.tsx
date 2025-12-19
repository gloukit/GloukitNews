import NewsCard from "@/components/news-card";
import { useNewsQuery } from "@/hooks/use-newsQueries";
import { useNavigate, useParams } from "react-router-dom"
import { ErrorEmpty, SkeletonList } from "@/components/skelton-error";
import { Empty, EmptyDescription, EmptyHeader, EmptyTitle } from "@/components/ui/empty";
import { Newspaper, Undo2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";


export default function TopHeadlines(){
    const navigate = useNavigate();
    const {country} = useParams();
    console.log(country)

    function handleSelect(value:string){
        if(value) {
            navigate(`/topheadlines/${value}`)
        }else{
            navigate("/",{replace:true});
        }
    }

    const {data,isLoading,error,refetch} = useNewsQuery(country??"us");
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
                <h3 className="text-lg">Top Headlines in </h3>
                <Select defaultValue={country} 
                        onValueChange={(value)=>handleSelect(value)}>
                    <SelectTrigger className="w-20 text-md">
                        <SelectValue />
                    </SelectTrigger>

                    <SelectContent>
                        <SelectItem value="cn">cn</SelectItem>
                        <SelectItem value="de">de</SelectItem>
                        <SelectItem value="fr">fr</SelectItem>
                        <SelectItem value="jp">jp</SelectItem>
                        <SelectItem value="uk">uk</SelectItem>
                        <SelectItem value="us">us</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            
            <div>
                {articles && articles.length>0 && articles.map((article,index)=>(
                    <NewsCard {...article} key={index}/>
                ))}
            </div>
        </div>
    )
}