import { copyToClipboard, formatDate, formatTitle } from "@/lib/utils";
import { Button } from "./ui/button";
import { Dialog,DialogContent, DialogFooter, DialogTrigger } from "./ui/dialog";
import type { ArticleDataType } from "@/api/types";
import { useState } from "react";
import ButtonsGroup from "./buttons-group";
import { Image } from "./image";


export default function ContentDialog(props:ArticleDataType){
    const {title,author,content,publishedAt,url,urlToImage} = props;
    const [copied,setCopied] = useState(false);

    const handleCopy = async (url:string) => {
        try {
            await copyToClipboard(url);
            setCopied(true);
        } catch (error) {
            console.log("复制失败",error);
        }
    }

    return (
        <Dialog>
            <form>
                <DialogTrigger asChild>
                    <h3 className="cursor-pointer hover:underline hover:underline-offset-2">{formatTitle(title)}</h3>
                </DialogTrigger>

                <DialogContent>
                    <div className="flex flex-col gap-2 ">
                        <h4 className="text-xl font-bold">{formatTitle(title)}</h4>
                        <div className="flex justify-between text-muted-foreground">
                            <p>{formatDate(publishedAt)}</p>
                            <p>{author}</p>
                        </div>

                        <div className="w-full aspect-video">
                            <Image src={urlToImage} alt={title} className="h-full object-cover"/>
                        </div>
                        <p>{content}</p>
                    </div>

                    <DialogFooter className="flex">
                        <Button className="cursor-pointer flex-1">
                            <a href={url} target="_blank">Read the Original</a>
                        </Button>
                        <Button className="cursor-pointer flex-1" onClick={()=>handleCopy(url)}>
                            {copied? "Already Copied" : "Copy the Original Link"}
                        </Button> 
                        <ButtonsGroup article={props}/>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    )
}