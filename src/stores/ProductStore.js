import { defineStore } from "pinia";
import products from '@/data/products.json'


export const useProduct= defineStore("ProductStore", {
    state: () => {
        return {
            products,
        }
    }
})

