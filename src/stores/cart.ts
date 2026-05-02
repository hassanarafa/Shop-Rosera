import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
    state: () => ({
        items: [] as any[]
    }),
    getters: {
        count: (state) => state.items.reduce((acc, item) => acc + item.quantity, 0)
    },
    actions: {
        addToCart(product: any) {
            const existing = this.items.find(i => i.id === product.id)
            if (existing) existing.quantity++
            else this.items.push({ ...product, quantity: 1 })
        }
    }
})