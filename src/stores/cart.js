import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useCartStore = defineStore('cart', () => {
    const items = ref([]); // This will store { ...product, quantity }

    /**
     * --- GETTERS ---
     * Computed properties that derive state.
     */

    // Calculates the total number of individual items in the cart.
    const totalItems = computed(() => {
        return items.value.reduce((total, item) => total + item.quantity, 0);
    });

    // Calculates the total price of all items in the cart.
    const totalPrice = computed(() => {
        return items.value.reduce((total, item) => total + (item.price * item.quantity), 0);
    });

    /**
     * --- ACTIONS ---
     * Functions that cause side effects and can be asynchronous.
     */

    function addToCart(product) {
        const existingItem = items.value.find(item => item.id === product.id);
        if (existingItem) {
            existingItem.quantity++; // Increase quantity if item already exists
        } else {
            items.value.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image, // Ensure the image property is explicitly included
                quantity: 1
            }); // Add new item
        }
    }

    function removeFromCart(productId) {
        items.value = items.value.filter(item => item.id !== productId);
    }

    function increaseQuantity(productId) {
        const item = items.value.find(item => item.id === productId);
        if (item) item.quantity++;
    }

    function decreaseQuantity(productId) {
        const item = items.value.find(item => item.id === productId);
        if (item && item.quantity > 1) {
            item.quantity--;
        } else if (item) {
            removeFromCart(productId); // Remove item if quantity is 1 or less
        }
    }

    return {
        items,
        totalItems,
        totalPrice,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
    };
});