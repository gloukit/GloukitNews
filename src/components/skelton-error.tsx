import { RotateCcw, ShieldAlert } from "lucide-react";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyTitle } from "./ui/empty";
import { Skeleton } from "./ui/skeleton";
import { Button } from "./ui/button";

export function SkeletonHome(){
    return(
    <div className="space-y-6">
        <div className="flex gap-6">
            <Skeleton className="h-[500px] w-full rounded-lg" />
            <div className="h-[500px] w-full flex flex-col gap-3">
                <Skeleton className="flex-1 rounded-lg" />
                <Skeleton className="flex-1 rounded-lg" />
                <Skeleton className="flex-1 rounded-lg" />
                <Skeleton className="flex-1 rounded-lg" />
            </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Skeleton className="h-[300px] w-full rounded-lg" />
          <Skeleton className="h-[300px] w-full rounded-lg" />
          <Skeleton className="h-[300px] w-full rounded-lg" />
        </div>
    </div>
    )
}

export function SkeletonList(){
    return (
        <div className="h-[500px] w-full flex flex-col gap-3">
            <Skeleton className="flex-1 rounded-lg" />
            <Skeleton className="flex-1 rounded-lg" />
            <Skeleton className="flex-1 rounded-lg" />
        </div>
    )
}

{/*可以传入error信息*/}
interface ErrorType {
    error:Error|null;
    handleRefresh:()=>void;
}

export function ErrorEmpty({error,handleRefresh}:ErrorType){
    return (
        <Empty>
            <EmptyHeader>

                <EmptyTitle className="flex items-center gap-4 text-2xl">
                    <ShieldAlert size={35}/>
                   {`${error?.name}`} 
                </EmptyTitle>
                {error && (
                    <EmptyDescription className="text-lg mt-4">
                        {error.message}
                    </EmptyDescription>
                )}
            </EmptyHeader>

            <EmptyContent>
                <Button onClick={handleRefresh}>{/*在这里重新请求数据*/}
                    <span className="font-bold">Try Again</span>
                    <RotateCcw className="ml-2 stroke-3"/>
                </Button>
            </EmptyContent>
        </Empty>
    )
}