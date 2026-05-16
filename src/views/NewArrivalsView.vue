<script setup>
import { ref } from 'vue';
import { useCartStore } from '@/stores/cart';

const cart = useCartStore();

const showSuccess = ref(false);
const addedScent = ref('');

const newArrivals = ref([
    {
        id: 7,
        name: 'Midnight Rose',
        price: 720,
        notes: 'Dark Rose & Patchouli',
        in_stock: true,
        image: '/rosera.jpeg', // Fallback to existing image
    },
    {
        id: 8,
        name: 'Ocean Breeze',
        price: 680,
        notes: 'Sea Salt & Bergamot',
        in_stock: true,
        image: '/stravia.jpeg', // Fallback to existing image
    },
    {
        id: 9,
        name: 'Desert Bloom',
        price: 750,
        notes: 'Oud & Sweet Sandalwood',
        in_stock: true,
        image: '/aventor.jpeg', // Fallback to existing image
    }
]);

const handleAddToCart = (product) => {
    cart.addToCart(product);
    addedScent.value = product.name;
    showSuccess.value = true;

    // Auto-hide notification after 3 seconds
    setTimeout(() => {
        showSuccess.value = false;
    }, 3000);
};
</script>

<template>
    <div class="min-h-screen bg-stone-50 pt-28 pb-24 px-6 md:px-12 relative">
        <!-- SUCCESS NOTIFICATION (TOAST) -->
        <Transition enter-active-class="transform transition duration-300 ease-out"
            enter-from-class="translate-y-10 opacity-0" enter-to-class="translate-y-0 opacity-100"
            leave-active-class="transition duration-200 ease-in" leave-from-class="opacity-100"
            leave-to-class="opacity-0">
            <div v-if="showSuccess"
                class="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 bg-stone-800 text-white px-8 py-4 rounded-full shadow-2xl flex items-center gap-3">
                <span class="text-rose-400">✨</span>
                <span class="text-xs font-bold uppercase tracking-widest">{{ addedScent }} added to basket</span>
            </div>
        </Transition>

        <div class="max-w-7xl mx-auto">
            <!-- Header Section -->
            <div class="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
                <div class="space-y-3">
                    <h2 class="text-[10px] uppercase tracking-[0.5em] font-bold text-rose-500 opacity-80">Latest Drops
                    </h2>
                    <h1 class="text-4xl md:text-6xl font-serif text-stone-800 uppercase tracking-tighter">
                        New <span class="italic font-light text-rose-500">Arrivals</span>
                    </h1>
                    <p class="text-base text-stone-500 mt-4 italic font-serif">Discover our newest exclusive fragrances,
                        crafted for elegance.</p>
                </div>
            </div>

            <!-- Product Grid -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                <div v-for="product in newArrivals" :key="product.id"
                    class="group relative flex flex-col items-center text-center bg-white/40 backdrop-blur-xl p-6 rounded-[2rem] border border-white/50 shadow-sm hover:shadow-md transition-all duration-500">
                    <div class="absolute top-6 right-6 z-20">
                        <span
                            class="bg-rose-500 text-white text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-full shadow-md">NEW</span>
                    </div>
                    <router-link :to="'/product/' + product.id"
                        class="aspect-[4/5] w-full mb-8 flex items-center justify-center overflow-hidden bg-stone-100/50 border border-stone-200/50 rounded-[1.5rem] relative transition-all duration-500 group-hover:bg-rose-50/50 group-hover:border-rose-100/50">
                        <img :src="product.image"
                            class="h-[80%] object-contain transition-all duration-700 z-10 mix-blend-multiply group-hover:scale-110 group-hover:-rotate-2" />
                    </router-link>
                    <div class="space-y-2 px-2 w-full">
                        <router-link :to="'/product/' + product.id">
                            <h3
                                class="font-serif text-3xl text-stone-800 leading-tight hover:text-rose-500 transition-colors">
                                {{ product.name }}</h3>
                        </router-link>
                        <p class="text-rose-500 text-[10px] font-bold uppercase tracking-[0.3em] opacity-80 mt-2">{{
                            product.notes }}</p>
                        <div class="mt-6 flex flex-col items-center gap-4">
                            <span class="font-serif italic text-2xl text-stone-700">{{ product.price }} <span
                                    class="text-lg text-rose-500 font-light">EGP</span></span>
                            <button @click="handleAddToCart(product)" :disabled="!product.in_stock"
                                class="w-full mt-2 bg-stone-800 text-white px-8 py-4 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-rose-500 disabled:opacity-50 transition-all duration-500 shadow-xl shadow-stone-800/20 active:scale-95">Add
                                to Basket</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>