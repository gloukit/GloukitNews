import { useEffect, useState } from "react";

export function useLocalStorage<T>(key:string,initialValue:T){
    const [storedValue,setStoredValue] = useState(()=>{
        try {
            const data = window.localStorage.getItem(key);
            return data? JSON.parse(data) : initialValue;
        } catch (error) {
            console.log(error);
            return initialValue;
        }
    });

    useEffect(()=>{
        try {
            window.localStorage.setItem(key,JSON.stringify(storedValue));
        } catch (error) {
            console.log(error);
        }
    },[key,storedValue]);

    return [storedValue,setStoredValue] as const;
}