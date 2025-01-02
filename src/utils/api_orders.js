import axios from "axios";

import{toast} from 'sonner';
import {API_URL} from "";

export function createOrder() {
    try {
        const response =  axios.post(API_URL + "/orders",{
            customerName
        })
    }catch (error) {
        toast.error(error.message);
    }
}