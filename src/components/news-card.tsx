import { Tooltip, TooltipContent } from "./ui/tooltip";
import { TooltipTrigger } from "@radix-ui/react-tooltip";
import ContentDialog from "./content-dialog";
import { formatDate } from "@/lib/utils";
import type { ArticleDataType } from "@/api/types";
import { Image } from "./image";


export default function NewsCard(props:ArticleDataType){
    const {source,title,description,url,urlToImage,publishedAt} = props;

    return (
        <div className="w-full flex md:flex-row flex-col border-b-2 py-3 md:gap-4 gap-2">
            <div className="md:h-[150px] lg:h-[120px] h-[250px] aspect-video">
                <Image src={urlToImage} alt={title} className="w-full h-full object-cover"/>
            </div>
            <div className="w-full flex flex-col gap-1">

                {/*点击标题，跳出新闻详情卡片*/}
                <div className="text-xl font-bold ">
                    <ContentDialog {...props}/>
                </div>

                <p className="flex-1">
                    <Tooltip>
                        <TooltipTrigger className="text-left">
                            <p className="line-clamp-2">
                                <a href={url} target="_blank">
                                    {description}
                                </a>
                            </p>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>read the original</p>
                        </TooltipContent>
                    </Tooltip>
                </p>

                <div className="w-full flex items-center gap-2">
                    <p className="bg-foreground/60 text-background px-1 py-0.5 rounded text-xs font-bold">
                        {source.name}
                    </p>
                    <p className="text-muted-foreground text-sm mb-1">
                        {formatDate(publishedAt)}
                    </p>
                </div>
            </div>
        </div>
    )
}