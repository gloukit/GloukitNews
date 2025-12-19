export interface ErrorDataType {
    status:string;
    code:string;
    message:string;
}

export interface ArticleDataType {
    source : {
        id:string | null ;
        name:string;
    },
    author : string;
    title:string;
    description:string;
    url:string;
    urlToImage:string;
    publishedAt:string;
    content:string;
}

export interface ArticleResponse {
    status:string;
    totalResults:number;
    articles : ArticleDataType[];
}


//News API接口使用说明
//美国头条新闻请求：https://newsapi.org/v2/top-headlines?country=us&apiKey=API_KEY 
//可用查询参数：category分类，不可以和sources混用；q搜索；pageSize（每页默认20条，最大100）；page
//country:不可以和sources混用；

//All articles about Bitcoin
//GET https://newsapi.org/v2/everything?q=bitcoin&apiKey=API_KEY  
// //可用的查询参数，apiKey为必须；q用于搜索，必须是url-encoded；pageSize为每页显示结果，默认且最大均为100；page页码

// Example response
export const errorData:ErrorDataType = { //忘了写API key就会出现
    "status": "error",     //用于判断请求是否成功，值可为 ok / error。如果是error就会出现code、message
    "code": "apiKeyMissing",
    "message": "Your API key is missing. Append this to the URL with the apiKey param, or use the x-api-key HTTP header."
}


export const dataExample:ArticleResponse = {
"status": "ok",
"totalResults": 10892,
"articles": [
    {
        "source": {  //来源
        "id": "wired",
        "name": "Wired"
        },
        "author": "Joel Khalili",
        "title": "Inside a Wild Bitcoin Heist: Five-Star Hotels, Cash-Stuffed Envelopes, and Vanishing Funds",
        "description": "Sophisticated crypto scams are on the rise. But few of them go to the lengths one bitcoin mining executive experienced earlier this year.",
        "url": "https://www.wired.com/story/bitcoin-scam-mining-as-service/",
        "urlToImage": "https://media.wired.com/photos/6913b909f757bec53ccf7811/191:100/w_1280,c_limit/Bitcoin-Heist-Business-1304706668.jpg",
        "publishedAt": "2025-11-17T10:00:00Z",
        "content": "As Kent Halliburton stood in a bathroom at the Rosewood Hotel in central Amsterdam, thousands of miles from home, running his fingers through an envelope filled with 10,000 in crisp banknotes, he sta… [+2362 chars]"
    },
    {
        "source": {
        "id": null,
        "name": "Gizmodo.com"
        },
        "author": "Rhett Jones",
        "title": "New Bitcoin Protocol Makes Payments Easier",
        "description": "Bitcoin is getting some Ethereum-like features.",
        "url": "https://gizmodo.com/new-bitcoin-protocol-makes-payments-easier-2000675741",
        "urlToImage": "https://media.wired.com/photos/6913b909f757bec53ccf7811/191:100/w_1280,c_limit/Bitcoin-Heist-Business-1304706668.jpg",
        "publishedAt": "2025-10-22T20:44:30Z",
        "content": "On Tuesday, Ark Labs announced the public beta launch of the highly anticipated (at least among Bitcoin purists) Arkade, which is a new upper-layer network protocol built on top of the base Bitcoin b… [+5273 chars]"
        },
    {
        "source": {
        "id": null,
        "name": "Gizmodo.com"
        },
        "author": "Rhett Jones",
        "title": "The $460 Billion Quantum Bitcoin Treasure Hunt",
        "description": "Satoshi’s early bitcoin stash creates massive opportunity for quantum computing startups.",
        "url": "https://gizmodo.com/the-460-billion-quantum-bitcoin-treasure-hunt-2000679398",
        "urlToImage": "https://media.wired.com/photos/6913b909f757bec53ccf7811/191:100/w_1280,c_limit/Bitcoin-Heist-Business-1304706668.jpg",
        "publishedAt": "2025-10-30T14:10:19Z",
        "content": "Earlier this month, researchers claimed a major breakthrough had occurred for quantum computing in terms of proving a verifiable advantage over traditional computers. This was then followed up by Goo… [+4884 chars]"
    },
    {
        "source": {
        "id": null,
        "name": "Gizmodo.com"
        },
        "author": "Kyle Torpey",
        "title": "Is Bitcoin Facing Another Civil War?",
        "description": "A controversy over spam prompted a new bitcoin fork proposal that's being mocked as a \"clownshow.\"",
        "url": "https://gizmodo.com/is-bitcoin-facing-another-civil-war-2000677968",
        "urlToImage": "https://media.wired.com/photos/6913b909f757bec53ccf7811/191:100/w_1280,c_limit/Bitcoin-Heist-Business-1304706668.jpg",
        "publishedAt": "2025-10-28T15:10:39Z",
        "content": "One of the most uncertain times during Bitcoins history was the so-called block size war, where the technical debate over how the network should scale to more users, among other disagreements, led to… [+7440 chars]"
    },
    {
        "source": {
        "id": null,
        "name": "Gizmodo.com"
        },
        "author": "Matt Novak",
        "title": "Bitcoin Price Plunges as Crypto Traders Get Nervous About Future",
        "description": "Fed chair Jerome Powell made some on Wall Street uneasy when he signaled that another rate cut was no guarantee when the Fed meets again.",
        "url": "https://gizmodo.com/bitcoin-price-plunges-as-crypto-traders-get-nervous-about-future-2000679860",
        "urlToImage": "https://media.wired.com/photos/6913b909f757bec53ccf7811/191:100/w_1280,c_limit/Bitcoin-Heist-Business-1304706668.jpg",
        "publishedAt": "2025-10-30T23:15:50Z",
        "content": "Bitcoin plunged over 4% on Thursday, falling as low as $106,290, as crypto traders reacted to signals from both the Federal Reserve and President Donald Trump. In short, crypto world seems nervous ab… [+2422 chars]"
    },
    {
        "source": {
        "id": null,
        "name": "Gizmodo.com"
        },
        "author": "Kyle Torpey",
        "title": "Privacy-Focused Bitcoin Developer Gets 5-Year Prison Sentence",
        "description": "Some people in the crypto community see the case as egregious at a time when shitcoin peddlers get favorable treatment.",
        "url": "https://gizmodo.com/privacy-focused-bitcoin-developer-gets-5-year-prison-sentence-2000683106",
        "urlToImage": "https://media.wired.com/photos/6913b909f757bec53ccf7811/191:100/w_1280,c_limit/Bitcoin-Heist-Business-1304706668.jpg",
        "publishedAt": "2025-11-07T15:45:32Z",
        "content": "On Thursday, Samourai Wallet co-founder Keonne Rodriguez received a five-year prison sentence after being convicted of charges that his wallet software allowed criminals to launder millions of dollar… [+5761 chars]"
    },
    {
        "source": {
        "id": null,
        "name": "Gizmodo.com"
        },
        "author": "Matt Novak",
        "title": "Bitcoin Continues Steep Decline, Down 34% Since Early October",
        "description": "The crypto bros are tired of winning.",
        "url": "https://gizmodo.com/bitcoin-continues-steep-decline-down-34-since-early-october-2000689539",
        "urlToImage": "https://media.wired.com/photos/6913b909f757bec53ccf7811/191:100/w_1280,c_limit/Bitcoin-Heist-Business-1304706668.jpg",
        "publishedAt": "2025-11-21T17:10:40Z",
        "content": "Bitcoin’s price just keeps falling. And nobody seems to know where the bottom might be this time.\r\nBitcoin dipped to a low of $80,760 on Friday before recovering above $85,000, only to dip again. The… [+3004 chars]"
    }
]   
}