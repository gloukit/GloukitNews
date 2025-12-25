import type {ArticleDataType } from "@/api/types";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "@/components/ui/carousel";
import { formatTitle } from "@/lib/utils";
import { useCallback, useEffect, useState } from "react";
import { Image } from "./image";

export default function HeadlineCarousel({articles}:{articles:ArticleDataType[]}){
    const [api,setApi] = useState<CarouselApi>();
    const [currentSlice,setCurrentSlice] = useState<number>(0);

    //获取当前图片的index即currentSlice，在此前提下圆点得以基于index变化
    useEffect(()=>{
        if(!api) return ;
        setCurrentSlice(api.selectedScrollSnap());
        api.on("select",()=>{
            setCurrentSlice(api.selectedScrollSnap());
        });
    },[api])

    //让点击dot跳转图片的功能得以实现
    const onDotButtonClick = useCallback((index:number)=>{
        if(!api) return ;
        api.scrollTo(index);
    },[api])


    return(
        <div>
            <Carousel setApi={setApi}>
                <CarouselContent className="max-h-[650px] h-full">
                    {articles.length>3 && articles.slice(0,3).map((article,index)=>(
                        <CarouselItem key={index} className="h-full">
                            <div className="h-full flex flex-col justify-between py-2 px-5 border rounded-2xl">
                                <a href={article.url} target="_blank">
                                    <div className="h-[400px]">
                                        <Image src={article.urlToImage} alt={article.title}
                                               className="w-full h-full my-1 object-cover"/>
                                    </div>

                                    <div className="flex flex-col h-[120px]">
                                        <h3 className="my-1.5 text-2xl font-bold line-clamp-2 leading-7 hover:underline underline-offset-2">
                                            {formatTitle(article.title)}
                                        </h3>
                                        <p className="line-clamp-2 text-sm">{article.description}</p>
                                    </div>
                                </a>
                            </div>
                            
                        </CarouselItem>
                    ))}
                </CarouselContent>
                

                <CarouselPrevious className="left-5"/>
                <CarouselNext className="right-5"/>

                {/*Dot navigation*/}
                {/*遍历数组生成小圆点，再根据index点击选中对应图片*/}
                <div className="w-full flex gap-4 justify-center absolute bottom-2">
                    {Array.from({length:3}).map((_,index)=>(
                        <div key={index}
                             onClick={()=>onDotButtonClick(index)} 
                             className={`cursor-pointer border border-gray-300 transition-all ${index===currentSlice?"w-12 h-3 rounded-r-full rounded-l-full border-gray-400":"w-3 h-3 rounded-full"}`}></div>
                    ))}
                </div>
            </Carousel>
        </div>
    )
}