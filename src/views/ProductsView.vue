<template>
    <div class="container mx-auto px-6 py-24">
        <div class="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div class="space-y-2">
                <h1 class="text-4xl md:text-5xl font-normal text-floria-dark uppercase tracking-tighter">The Collections
                </h1>
                <p class="text-sm text-floria-green">Delicate body splashes, misted with floral grace.</p>
            </div>

            <div class="w-full md:w-80 relative">
                <input v-model="searchQuery" type="text" placeholder="Search by flower or note..."
                    class="w-full border-b border-floria-green/40 py-3 pl-2 text-sm outline-none focus:border-floria-green transition" />
                <svg class="absolute right-2 top-3 w-5 h-5 text-floria-green/40" fill="none" stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
            </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div v-for="product in products" :key="product.id"
                class="group relative flex flex-col items-center text-center p-6 bg-white border border-gray-100 hover:border-floria-pink transition shadow-sm hover:shadow-lg">

                <div v-if="!product.in_stock"
                    class="absolute inset-0 bg-white/60 flex items-center justify-center z-10">
                    <span
                        class="text-xs font-bold uppercase tracking-widest text-floria-dark border border-floria-dark px-4 py-2">Misting
                        Soon</span>
                </div>

                <div class="aspect-[3/4] mb-8 flex items-center justify-center overflow-hidden bg-white p-6 relative">
                    <img src="@/assets/logo.svg" class="absolute h-full opacity-[0.03] scale-125 rotate-12" />
                    <img :src="product.image"
                        class="h-full object-contain group-hover:scale-105 transition duration-700 z-10" />
                </div>

                <h3 class="font-serif text-2xl leading-tight text-floria-dark">{{ product.name }}</h3>
                <p class="text-floria-green text-xs mt-2 font-semibold uppercase tracking-[0.2em]">{{ product.notes }}
                </p>

                <div class="mt-8 pt-6 border-t border-gray-100 w-full flex justify-between items-center px-4">
                    <span class="font-bold text-floria-dark">{{ product.price }} EGP</span>
                    <button @click="cart.addToCart(product)"
                        class="text-xs font-bold uppercase text-floria-green border border-floria-green px-5 py-2 hover:bg-floria-green hover:text-white transition">
                        Add to Basket
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useCartStore } from '@/stores/cart';

const cart = useCartStore();
const searchQuery = ref('');

// Example Body Splash Products
const products = ref([
    { id: 1, name: 'Blush Velvet Rose', price: 650, notes: 'Peony & Damask Rose', in_stock: true, image: 'https://images.lucy.ng/780/636/906/09939/victorias-secret-blush-rose--jasmine-pink-fragrance-mist--250-ml-lucy-780-636-906.jpg' },
    { id: 2, name: 'Sage Blossom Drift', price: 720, notes: 'Sage & Lavender', in_stock: true, image: 'https://images.fashiola.ae/product/122/100/525/4442220023.jpg' },
    { id: 3, name: 'Aura Jasmine Dew', price: 680, notes: 'Jasmine Mist & Bergamot', in_stock: false, image: 'https://images.lucy.ng/780/636/906/09937/victorias-secret-aura-mist--peach-pink-fragrance-mist--250-ml-lucy-780-636-906.jpg' }
]);
</script>