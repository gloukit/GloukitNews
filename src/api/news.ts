import { API_CONFIG } from "./config";
import type { ArticleResponse } from "./types";

class NewsAPI {
    private createUrl(endpoint:string,params:Record<string,string|number|null>){
        const searchParams = new URLSearchParams({apiKey:API_CONFIG.API_KEY, ...params});
        return `${endpoint}?${searchParams.toString()}`;
    }

    private async fetchData<T>(url:string):Promise<T>{
        const response = await fetch(url);

        let data:any;
        try {
            data = await response.json();
        } catch (error) {
            throw new Error("Invalid JSON response")
        }

        //第一步：检查HTTP层级的错误
        if(!response.ok){
            const message = data?.message || response.statusText || "Unknown HTTP Error";
            throw new Error (`HTTP Error: ${response.statusText}: ${message}`);
        }
        
        //第二步：检查API错误
        if(data?.status==="error"){
            throw new Error (`API Error: ${data.code} - ${data.message}`);
        }

        return data;
    }

    async getHeadlines (country:string):Promise<ArticleResponse>{
        const url = this.createUrl(`${API_CONFIG.BASE_URL}/top-headlines`,{country:country});
        return this.fetchData(url);
    }

    async getByCategory({category,page,pageSize}:{category:string; page:number; pageSize:number}):Promise<ArticleResponse>{
        const url = this.createUrl(`${API_CONFIG.BASE_URL}/top-headlines`,{
            category:category,
            page:page.toString(),
            pageSize:pageSize.toString(),
        });
        return this.fetchData(url);
    }

    async searchNews({query,page,pageSize}:{query:string; page:number; pageSize:number}):Promise<ArticleResponse>{
        const url = this.createUrl(`${API_CONFIG.BASE_URL}/everything`,{
            q:query,
            page:page.toString(),
            pageSize:pageSize.toString(),            
        });
        return this.fetchData(url);
    }
}

export const newsAPI = new NewsAPI();