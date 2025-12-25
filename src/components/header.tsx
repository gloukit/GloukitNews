import { Link } from "react-router-dom";
import ThemeToggle from "./theme-toggle";
import Search from "./search";
import {format} from "date-fns";
import { Separator } from "./ui/separator";
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import { BookOpen } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { useCollect, type CollectType } from "@/hooks/use-collect";
import { Image } from "./image";
import ContentDialog from "./content-dialog";

export const categories:string[] = [
    "Business",
    "Technology",
    "Science",
    "Entertainment",
    "Sports",
    "Health",
]

export default function Header(){
    const today = format(Date.now(),"MM.dd / yyyy");

    const {collects:bookmarksData} = useCollect("bookmarks");
    const {collects:likesData} = useCollect("likes");    

    return (
        <div className="w-full flex flex-col gap-2">
            <div className="w-full py-2 px-5 bg-foreground dark:bg-gray-800 text-background dark:text-foreground flex items-end justify-between">
                <Link to="/">
                    <h1 className="text-xl font-bold">Gloukit News</h1>
                </Link>
                
                <div className="flex justify-between items-end gap-5 w-[250px]">
                    <p>Today : <span className="mx-2">{today}</span></p>
                    <div className="mr-4">
                      <ThemeToggle/>
                    </div>
                </div>
            </div>
            
            <div className="w-full py-1 px-5 bg-background flex lg:flex-row flex-col gap-2 md:justify-between items-center">
                {/*分类导航栏*/}
                <nav className="lg:w-2/3 w-full flex justify-between lg:text-lg text-md text-foreground font-bold">
                    {categories.map((category,index)=>(
                            <div key={index} className="mx-2 hover:text-muted-foreground p-auto cursor-pointer transition-all">
                                <Link to={`/category/${category}`}>
                                    {category}
                                </Link> 
                            </div>
                    ))}
                </nav>

                <div className="flex">
                    {/*搜索框*/}
                    <Search/>

                    {/*弹出收藏书签的侧边栏*/}
                    <Sheet>
                        <SheetTrigger asChild className="ml-2">
                            <Button variant="outline" className="cursor-pointer">
                                <BookOpen color="grey" className="size-5"/>
                            </Button>
                        </SheetTrigger>
                        <SheetContent className="max-w-[90vw]! w-[420px]! h-full">
                            <Tabs className="h-full overflow-y-auto">
                                <TabsList className="w-full">
                                    <TabsTrigger value="bookmarks">Bookmark</TabsTrigger>
                                    <TabsTrigger value="likes">Like</TabsTrigger>
                                </TabsList>

                                <TabsContent value="bookmarks" className="overflow-y-auto"> {/*和父组件一起用才能overflow-auto才能实现仅中心区域的滚动*/}
                                    {bookmarksData.map((item:CollectType)=>(
                                        <div key={item.id} className="flex items-center gap-2 mx-2 py-2 not-first:border-t-2">
                                            <div className="h-10 aspect-video">
                                                <Image src={item.detail.urlToImage} alt={item.detail.title} className="h-full w-full"/>
                                            </div>

                                            <div className="text-sm">
                                                <ContentDialog {...item.detail}/>
                                            </div>
                                        </div>
                                    ))}
                                </TabsContent>

                                <TabsContent value="likes" className="overflow-y-auto">
                                    {likesData.map((item:CollectType)=>(
                                        <div key={item.id} className="flex items-center gap-2 mx-2 py-2 not-first:border-t-2">
                                            <div className="h-10 aspect-video">
                                                <Image src={item.detail.urlToImage} alt={item.detail.title} className="h-full w-full"/>
                                            </div>
                                            <div className="text-xs">
                                                <ContentDialog {...item.detail}/>
                                            </div>                                   
                                        </div>
                                    ))}
                                </TabsContent>
                            </Tabs>
                            
                            <SheetFooter className="p-2">
                                <SheetClose asChild>
                                    <Button variant="outline">Close</Button>
                                </SheetClose>
                            </SheetFooter>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>

            <div className="flex flex-col justify-center items-center gap-2">
              <Separator className="max-w-[98%]"/>
              <Separator className="max-w-[98%]"/>
            </div>
        </div>
    )
}