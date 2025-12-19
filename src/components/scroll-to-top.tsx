import { ArrowBigUpDash } from "lucide-react";
import { Button } from "./ui/button";

export function ScrollToTop (){
    return (
        <Button variant="outline" className="w-12 h-12 rounded-full cursor-pointer" 
                onClick={()=>window.scrollTo({top:0,behavior:"smooth"})}>
            <ArrowBigUpDash className="size-6"/>
        </Button>
    )
}