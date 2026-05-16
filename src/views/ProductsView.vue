<script setup>
import { ref, computed } from 'vue';
import { useCartStore } from '@/stores/cart';

const cart = useCartStore();
const searchQuery = ref('');

const showSuccess = ref(false);
const addedScent = ref('');

const products = ref([
    {
        id: 1,
        name: 'Rosera',
        price: 650,
        notes: 'Damask Rose & Velvet Musk',
        in_stock: true,
        image: '/rosera.jpeg'
    },
    {
        id: 2,
        name: 'Pomberry',
        price: 620,
        notes: 'Wild Pomegranate & Pink Hearts',
        in_stock: true,
        image: '/pomberry.jpeg'
    },
    {
        id: 3,
        name: 'Aventor',
        price: 750,
        notes: 'Deep Woods & Golden Sparks',
        in_stock: true,
        image: '/aventor.jpeg'
    },
    {
        id: 4,
        name: 'Stravia',
        price: 620,
        notes: 'Fresh Strawberry & Summer Leaf',
        in_stock: true,
        image: '/stravia.jpeg'
    },
    {
        id: 5,
        name: 'Golden Vanilla',
        price: 680,
        notes: 'Warm Vanilla & Midnight Stars',
        in_stock: true,
        image: '/vanilla.jpeg'
    },
    {
        id: 6,
        name: 'Sugaria',
        price: 650,
        notes: 'Sweet Candy & Pastel Dreams',
        in_stock: false,
        image: '/sugaria.jpeg'
    }
]);

// --- New Function for Feedback ---
const handleAddToCart = (product) => {
    cart.addToCart(product);
    addedScent.value = product.name;
    showSuccess.value = true;

    // Auto-hide notification after 3 seconds
    setTimeout(() => {
        showSuccess.value = false;
    }, 3000);
};

const filteredProducts = computed(() => {
    const query = searchQuery.value.toLowerCase();
    return products.value.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.notes.toLowerCase().includes(query)
    );
});
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
                    <h2 class="text-[10px] uppercase tracking-[0.5em] font-bold text-rose-500 opacity-80">The Art of
                        Fragrance</h2>
                    <h1 class="text-4xl md:text-6xl font-serif text-stone-800 uppercase tracking-tighter">
                        The <span class="italic font-light text-rose-500">Collections</span>
                    </h1>
                    <p class="text-base text-stone-500 mt-4 italic font-serif">Delicate body splashes, misted with
                        floral grace.</p>
                </div>

                <!-- Search Bar -->
                <div class="w-full md:w-96 relative group">
                    <input v-model="searchQuery" type="text" placeholder="Search by flower or scent note..."
                        class="w-full bg-white/70 backdrop-blur-xl border border-white/50 shadow-sm rounded-full py-4 pl-6 pr-12 text-sm outline-none focus:border-rose-300 focus:ring-2 focus:ring-rose-200/50 transition-all text-stone-700 font-medium placeholder:text-stone-400" />
                    <svg class="absolute right-5 top-4 w-5 h-5 text-stone-400 group-focus-within:text-rose-500 transition-colors"
                        fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                </div>
            </div>

            <!-- Product Grid -->
            <div v-if="filteredProducts.length > 0"
                class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                <div v-for="product in filteredProducts" :key="product.id"
                    class="group relative flex flex-col items-center text-center bg-white/40 backdrop-blur-xl p-6 rounded-[2rem] border border-white/50 shadow-sm hover:shadow-md transition-all duration-500">

                    <!-- Out of Stock Overlay -->
                    <div v-if="!product.in_stock"
                        class="absolute inset-0 bg-stone-50/40 backdrop-blur-[2px] flex items-center justify-center z-20 rounded-[2rem]">
                        <span
                            class="text-[10px] font-bold uppercase tracking-[0.3em] text-stone-800 border border-stone-800 px-6 py-3 bg-white/90 rounded-full shadow-lg">
                            Misting Soon
                        </span>
                    </div>

                    <!-- Image Container -->
                    <router-link :to="'/product/' + product.id"
                        class="aspect-[4/5] w-full mb-8 flex items-center justify-center overflow-hidden bg-rose-50/50 border border-rose-100/50 rounded-[1.5rem] relative transition-all duration-500 group-hover:bg-rose-50">
                        <img src="@/assets/logo.svg" class="absolute h-1/2 opacity-[0.04] pointer-events-none" />
                        <img :src="product.image"
                            class="h-[80%] object-contain transition-all duration-700 z-10 mix-blend-multiply group-hover:scale-110 group-hover:-rotate-2" />
                    </router-link>

                    <!-- Details -->
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

                            <!-- Updated Button with handleAddToCart -->
                            <button @click="handleAddToCart(product)" :disabled="!product.in_stock"
                                class="w-full mt-2 bg-rose-500 text-white px-8 py-4 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-stone-800 disabled:opacity-50 disabled:hover:bg-rose-500 transition-all duration-500 shadow-xl shadow-rose-500/20 active:scale-95">
                                Add to Basket
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- No Results -->
            <div v-else class="py-20 text-center space-y-6">
                <p class="font-serif italic text-3xl text-stone-400">No fragrances match your search...</p>
                <button @click="searchQuery = ''"
                    class="text-rose-500 text-[10px] font-bold uppercase tracking-widest hover:text-stone-800 transition-colors">View
                    All Collections</button>
            </div>
        </div>
    </div>
</template>