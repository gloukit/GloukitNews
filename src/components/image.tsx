import { useState } from "react";
import { Skeleton } from "./ui/skeleton";

interface ImageProps {
    src:string;
    alt:string;
    className?:string;
}

export function Image({src,alt,className}:ImageProps){
    const fallbackURL = "/pexels-robot.jpg";
    const [isLoaded,setIsLoaded] = useState(false);
    const [isError,setIsError] = useState(false);

    return (
        <>
            {!isLoaded && !isError && (
                <Skeleton className={className}/>
            )}

            {/* img 一直存在，才能触发 onLoad/onError */}
            <img onLoad={()=>setIsLoaded(true)}
                 onError={()=>{
                    setIsError(true);
                    setIsLoaded(false);
                }}
                 src={isError? fallbackURL : src} 
                 alt={alt}
                 style={{display:isLoaded? "block" : "none" }}  /*只用 CSS 控制显示/隐藏*/
                 className={className}/>
        </>
    )
}