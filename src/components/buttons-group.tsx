import { Bookmark, Heart } from "lucide-react";
import { Button } from "./ui/button";
import type { ArticleDataType } from "@/api/types";
import { useCollect } from "@/hooks/use-collect";

interface ButtonType {
    article:ArticleDataType
}

export default function ButtonsGroup({article}:ButtonType){

    /*书签*/
    const {add:addBookmark,remove:removeBookmark,isCollect:isBookmark} = useCollect("bookmarks");
    const isCurrentlyBookmark = isBookmark(article.url);

    const handleToggleBookmark = () => {
        if(isCurrentlyBookmark){
            removeBookmark.mutate(article.url);
        } else {
            addBookmark.mutate(article);
        }
    }

    /*按赞*/
    const {add:addLike,remove:removeLike,isCollect:isLike} = useCollect("likes");
    const isCurrentlyLike = isLike(article.url);

    const handleToggleLike = () => {
        if(isCurrentlyLike){
            removeLike.mutate(article.url);
        } else {
            addLike.mutate(article);
        }
    }    

   
    /*使用useCollection不可行！！！！！
    const {add:addBookmark,remove:removeBookmark,isCollection:isBookmark} = useCollection("bookmark");
    const isCurrentlyBookmark = isBookmark(url);
    console.log(isCurrentlyBookmark)

    const handleToggleBookmark = () => {
        if(isCurrentlyBookmark){
            removeBookmark.mutate(url);
        } else {
            addBookmark.mutate({author,title,url,urlToImage,publishedAt});
        }       
    }*/

    return (
        <div className="flex space-x-2">
            <Button variant="outline" onClick={handleToggleLike}
                    className={`${isCurrentlyLike?"bg-red-300 hover:bg-red-200":""}`}>
                <Heart className={`${isCurrentlyLike?"fill-current":""}`}/>
            </Button>

            <Button variant="outline" onClick={handleToggleBookmark}
                    className={`${isCurrentlyBookmark?"bg-blue-300 hover:bg-blue-200":""}`}>
                <Bookmark className={`${isCurrentlyBookmark?"fill-current":""}`}/>
            </Button>
        </div>
    )
}