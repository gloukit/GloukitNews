import HeadlineCarousel from "@/components/headline-carousel";
import { ErrorEmpty, SkeletonHome } from "@/components/skelton-error";
import TeleSidebar from "@/components/sidebar-telegram";
import TopCategoryCard from "@/components/home-card";
import { useNewsQuery } from "@/hooks/use-newsQueries";

export function Home(){
    const {data,isLoading,error,refetch} = useNewsQuery("general");
    const articles = data?.articles ?? [];
    

    if(isLoading){return <SkeletonHome/>;}
    if(error){return <ErrorEmpty error={error} handleRefresh={()=>refetch()}/>;}

    return (
        <div className="flex flex-col gap-2 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-7 gap-8">
                <div className="col-span-4 h-full w-full">
                    {articles && <HeadlineCarousel articles={articles}/>}
                </div>
                <div className="col-span-3 h-full w-full">
                   {articles && <TeleSidebar articles={articles}/>}
                </div>
            </div>

            <div className="w-full grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 my-5">
               {articles && articles.slice(7,13).map((article,index)=>(
                    <>
                        <TopCategoryCard key={index} {...article}/>
                    </>
               ))}
            </div>
        </div>
    )}