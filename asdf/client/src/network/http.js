// 네트워크를 연결시켜주는 클래스 

export default class HttpClient{
    constructor(baseURL){
        this.baseURL = baseURL;
    }
    // 모든 네트워크는 비동기 처리해주는게 맞다 !
    // ${this.baseURL}${url} => this.baseURL => 로컬호스트:8080  
    async fetch(url, options){
        const res = await fetch(`${this.baseURL}${url}`, {
            ...options,
            headers: {
                'Content-Type':'application/json',
                ...options.headers
            }
        });

        let data;
        try {
            data = await res.json();
        }catch (error){
            console.error(error);
        }

        if(res.status > 299 || res.status <200){
            const message = data && data.message ? data.message : '문제가 발생하였습니다.😜';
            throw new Error(message);
        }

        return data;
    }
}