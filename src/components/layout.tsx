import {useEffect, useState, type PropsWithChildren} from "react";
import Header from "./header";
import { ScrollToTop } from "./scroll-to-top";

export function Layout({children}:PropsWithChildren){

    {/*控制“跳转到顶部”按钮的显示/隐藏*/}
    const [showScrollTop,setShowScrollTop] = useState(false);
    useEffect(()=>{
        let ticking = false;

        const onScroll = ()=>{
            if(!ticking){
                window.requestAnimationFrame(()=>{
                    const shouldShow = window.scrollY>300;
                    setShowScrollTop(prev => prev!==shouldShow? shouldShow : prev);
                    ticking = false ; 
                });
                ticking = true; 
            }
        }

        window.addEventListener("scroll",onScroll,{passive:true});

        return ()=>window.addEventListener("scroll",onScroll);
    },[]);

    return(
        <div className="flex flex-col h-screen w-full  min-w-[650px]">
            <header className="flex flex-col items-center justify-between">
                <Header/>
            </header>

            <main className="flex-1 p-5">
                {children}
            </main>

            <footer className="bg-foreground dark:bg-gray-800 text-background dark:text-foreground  flex flex-col items-center justify-center py-5">
                <p className="flex gap-4 items-center text-lg font-bold my-1">Made by
                    <a href="https://github.com/gloukit" target="_blank" className="flex gap-1.5 items-center hover:underline hover:underline-offset-5 active:scale-90 hover:text-yellow-50 transition-all"> 
                        <img src="/github-mark-white.svg" alt="github-logo" className="size-5"/>
                        GlouKit
                    </a>
                </p>
                <p className="my-1">Supported by
                    <span className="mx-1">
                        <a href="https://newsapi.org/" target="_blank" className="hover:underline hover:underline-offset-4 hover:text-yellow-50 transition-all">NewsAPI</a> 
                    </span> 
                    <span className="mx-2">© 2025 GlouKit. All rights reserved.</span>    
                </p>
            </footer>

            {showScrollTop && (
                <div className="fixed right-3 bottom-30">
                    <ScrollToTop/>
                </div>
            )}
        </div>
    )
}