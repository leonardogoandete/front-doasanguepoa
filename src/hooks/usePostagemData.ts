import { useQuery } from "@tanstack/react-query";
import axios, { AxiosPromise } from "axios"
import { getPostagemData } from '../interface/getPostagemData';

const API_URL = 'http://localhost:8080';
const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjgwODAiLCJ1cG4iOiIxMjM0NTY3ODkxMiIsImdyb3VwcyI6WyJVU1VBUklPIl0sImV4cCI6MTY5NjAxMzU3MTk1NywiaWF0IjoxNjk2MDEzNTY4LCJqdGkiOiI4ZmZmZjViYi05M2ZjLTQxYzUtODM1NC0xYzY2ZmE5NThhODcifQ.Kh5eXzf0MOzfKM8160tT1cl7P1USXvc2ZE_79kvwoEdbYPTMENfJ6YPF4BKcfu2OJDWi6Q5cF5nRtyJeZq7cVzL4ioOlartHgqeblP5cZScmY4hJz2XFgTsRgFccwBQZ2PX-xj5R9dh3VozyeUqC_mc_rAZ_W5X4bXnvV5wdJUrJ9wiBX6Cx-i6Uj4uWxIxYxhWYHYbDeq9zJvTMdvDonGQ9inKBlM_YYzcN0laFs47sNjtTBejraJvGsdisO_pOjRPARzbSEHpnaqcDjsheE1GaFjexT_iUUvYhJaJBg3u_gV2R9KGKGwjnT267CyF2o0MoHsnzsadEkWj4zl8D3g'

const fetchData = async (): AxiosPromise<getPostagemData[]> => {
    const response = axios.get(API_URL + '/postagens', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return response;
}

export function usePostagemData(){
    const query = useQuery({
        queryFn: fetchData,
        queryKey: ['postagem-data'],
        retry: 2
    })

    return {
        ...query,
        data: query.data?.data
    }
}