import { type ArticleDataType } from "@/api/types";
import { formatTitle } from "@/lib/utils";
import { ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

export default function TeleSidebar({articles}:{articles:ArticleDataType[]}){

    return (
        <div>
            <div className="flex justify-between items-center">
                <h1 className="text-xl text-muted-foreground font-bold flex gap-2 items-center">
                    Top Headlines
                </h1>
                <div className="hover:text-secondary-foreground text-muted-foreground font-bold">
                    <Link to="/category/general">
                        <div className="flex items-center gap-2">
                            View More
                            <ExternalLink className="size-4"/>
                        </div>                    
                    </Link>

                </div>
            </div>


            {articles.length>0 ? (
                <div className="flex flex-col">
                    {articles.slice(3,7).map((article)=>(
                        <div key={article.url} className="not-first:border-t-2 py-2 flex flex-col">
                            <h3 className="text-lg font-bold leading-5.5 hover:underline hover:underline-offset-2 line-clamp-2">
                                <a href={article.url} target="_blank">
                                    {formatTitle(article.title)}
                                </a>
                            </h3>

                            <p className="text-foreground/50 line-clamp-2 text-sm my-0.5">
                                {article.description}
                            </p>

                            <div>
                                <span className="min-w-15 px-1.5 py-0.5 text-center bg-foreground/60 text-background rounded text-xs font-bold">
                                    {article.source.name}
                                </span>
                            </div>

                        </div>
                    ))}
                </div>
            ):(null)}

        </div>
    )
}