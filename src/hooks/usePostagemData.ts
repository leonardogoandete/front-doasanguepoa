import { useQuery } from "@tanstack/react-query";
import axios, { AxiosPromise } from "axios";
import { getPostagemData } from '../interface/getPostagemData';
import { useEffect, useState } from "react";

const API_URL = 'http://localhost:8080';

export function usePostagemData() {
    const [authToken, setAuthToken] = useState<string | null>(null);

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            // Quando o token estiver disponível, armazene-o no estado local
            setAuthToken(token);
        }
    }, []);

    const fetchData = async (): AxiosPromise<getPostagemData[]> => {
        if (!authToken) {
            // Se o token ainda não estiver disponível, não faça a chamada à API
            return Promise.reject("Token não disponível");
        }

        const response = await axios.get(API_URL + '/postagens', {
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        });
        return response;
    }

    const query = useQuery({
        queryFn: fetchData,
        queryKey: ['postagem-data'],
        retry: 2,
        enabled: !!authToken, // Habilitar a consulta somente quando o token estiver disponível
    });

    return {
        ...query,
        data: query.data?.data
    }
}
