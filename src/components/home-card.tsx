import { type ArticleDataType } from "@/api/types";
import { Card, CardContent} from "./ui/card";

import { formatTitle } from "@/lib/utils";
import { Image } from "./image";

export default function TopCategoryCard(props:ArticleDataType){
    const {title,url,source,urlToImage} = props;

    return (
        <Card className="min-w-xs w-full flex flex-col gap-2 shadow-none border-none">
            <CardContent className="flex flex-col justify-between gap-5 p-0">
                <div className="lg:max-w-[450px] h-80 relative">
                    <Image src={urlToImage} alt={title} className="h-full w-full object-cover"/>
                    <p className="w-full h-18 p-2 font-bold text-md flex items-center bg-black/80 text-white hover:underline underline-offset-2 absolute bottom-0">
                        <a href={url} target="_blank" className="line-clamp-3">
                            {formatTitle(title)}    
                        </a>
                    </p>
                    <p className="min-w-15 bg-black/60 text-white text-md px-3 py-1 text-center absolute top-0">
                        {source.name}
                    </p>
                </div>
            </CardContent>
        </Card>
    )
}