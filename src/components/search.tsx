import { SearchIcon, X } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSearchHistory, type SearchItemType } from "@/hooks/use-search-history";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export default function Search(){
  //提交搜索，跳转到对应搜索结果页面
  const [query,setQuery] = useState<string>("");
  const navigate = useNavigate();

  //搜索历史的展示：当用户focus输入框，且搜索历史大于0时，显示搜索历史
  const [focusInput,setFocusInput] = useState(false);
  const {history,addToHistory,removeHistory} = useSearchHistory();

  function searchFn (item:string){
      if(item.trim()==="") return;
      navigate(`/search?q=${item}`);
      addToHistory.mutate(item);
      setQuery("");
  }

    return (
      <form action={()=>searchFn(query)}  /*React 19 ：form 新增函数式action，自动阻止默认刷新、自动取值、自动reset*/
            className="relative"> 
          <Input className="min-w-60 px-2"
                 placeholder="search..." 
                 value={query} 
                 onChange={(events)=>setQuery(events.target.value)}
                 onFocus={()=>setFocusInput(true)}
                 onBlur={()=>setTimeout(()=>setFocusInput(false),300)}
                />

          {focusInput && history.length>0 && (
            <ul className="absolute left-0 bg-primary-foreground text-foreground w-full rounded p-2 my-1 shadow-xl z-10">
              {history.map((item:SearchItemType)=>(
                <li key={item.id}
                    onMouseDown={()=>searchFn(item.searchItem)}
                    className="cursor-pointer hover:bg-muted-foreground hover:text-background px-2 py-1 rounded flex justify-between items-center">
                  <span>
                    {item.searchItem} 
                  </span>
                  <button className="hover:text-foreground cursor-pointer" 
                          onMouseDown={(e)=>{
                            e.stopPropagation();  //阻止冒泡，否则执行的就是父组件<li/>的mouseDown
                            removeHistory.mutate(item.searchItem);
                            }} >
                    <X size={16}/>
                  </button>
                </li>
              ))}
            </ul>
          )}

          <Button variant="secondary" className="absolute right-0">
            <SearchIcon className="size-5" color="grey"/>
          </Button>
      </form>
    )
}