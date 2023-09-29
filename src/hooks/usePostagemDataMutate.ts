import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosPromise } from "axios"
import { PostagemData } from '../interface/PostagemData';

const API_URL = 'http://localhost:8080';
const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjgwODAiLCJ1cG4iOiI4NzAyMDUxNzAwMDEyMCIsImdyb3VwcyI6WyJJTlNUSVRVSUNBTyJdLCJleHAiOjE2OTYwMTcyOTQ3OTAsImlhdCI6MTY5NjAxNzI5MSwianRpIjoiMTVhMGZjNGItYWY4Zi00NzY5LWI2NWYtMzMwYzNkOWI1MzYxIn0.0Vut8HPaCsMiJF7zYcGylgtWtyYcs9QwJm0HXEPZyJyZwyNx11MgJv5YRIkXhxllXchLA5-lSKXN9ctQU_exWhubXYChVBkadJC3FIqGl0B71iE2boG9WwG9ffZZKkAkuGl_6eYDoxub4eNCJoAHsJ-emWoDr_ZDCT6tczDqOoSktPFjoF5SN3REiZgxwFxeh3VBpaehg9diPEZv14qBpIn1qsbfDZ3nkSlQuY6XNaUNPEb40aiGETq7zBgU_MzM2Gn2b-9qtKAQsRo_Fs8XvGVjk-86OFA2iK3j3tZDR8wxs2P_rMhLDWpxOP2xpGbucSwDB88Wf6h6Ly0ESU1uxg'

const postData = async (data: PostagemData): AxiosPromise<any> => {
    console.log(data);
    const response = axios.post(API_URL + '/postagens',data,{
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return response;
}

export function usePostagemDataMutate(){
    const queryClient = useQueryClient();
    const mutate = useMutation({
        mutationFn: postData,
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries(['postagem-data'])
        }
    })

    return mutate;
}