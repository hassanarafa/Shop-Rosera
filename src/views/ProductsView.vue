<template>
    <div class="container mx-auto px-6 py-32">
        <!-- Header & Search Section -->
        <div class="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div class="space-y-3">
                <h2 class="text-xs uppercase tracking-[0.5em] font-bold text-floria-green">The Art of Fragrance</h2>
                <h1 class="text-4xl md:text-6xl font-serif text-floria-dark uppercase tracking-tighter">
                    The <span class="italic font-light">Collections</span>
                </h1>
                <p class="text-sm text-floria-dark/60 italic font-serif">Delicate body splashes, misted with floral grace.</p>
            </div>

            <!-- Search Bar -->
            <div class="w-full md:w-96 relative group">
                <input v-model="searchQuery" type="text" placeholder="Search by flower or scent note..."
                    class="w-full border-b border-floria-pink/50 py-4 pl-2 text-sm outline-none focus:border-floria-green transition-colors bg-transparent font-light" />
                <svg class="absolute right-2 top-4 w-5 h-5 text-floria-green/40 group-focus-within:text-floria-green transition-colors" fill="none" stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
            </div>
        </div>

        <!-- Product Grid -->
        <div v-if="filteredProducts.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-20">
            <div v-for="product in filteredProducts" :key="product.id"
                class="group relative flex flex-col items-center text-center">

                <!-- Out of Stock Overlay -->
                <div v-if="!product.in_stock"
                    class="absolute inset-0 bg-white/40 backdrop-blur-[2px] flex items-center justify-center z-20 rounded-2xl">
                    <span class="text-[10px] font-bold uppercase tracking-[0.3em] text-floria-dark border border-floria-dark px-6 py-3 bg-white/90">
                        Misting Soon
                    </span>
                </div>

                <!-- Product Image Container -->
                <div class="aspect-[4/5] w-full mb-8 flex items-center justify-center overflow-hidden bg-floria-pink/5 rounded-3xl relative transition-all duration-500 group-hover:bg-floria-pink/10">
                    <!-- Subtle Logo Watermark -->
                    <img src="@/assets/logo.svg" class="absolute h-1/2 opacity-[0.04] pointer-events-none" />
                    
                    <!-- The Splash Bottle -->
                    <img :src="product.image"
                        class="h-[80%] object-contain transition-all duration-700 z-10 mix-blend-multiply group-hover:scale-110 group-hover:-rotate-2" />
                </div>

                <!-- Product Details -->
                <div class="space-y-2 px-2">
                    <h3 class="font-serif text-3xl text-floria-dark leading-tight">{{ product.name }}</h3>
                    <p class="text-floria-green text-[10px] font-bold uppercase tracking-[0.3em] opacity-80">{{ product.notes }}</p>
                    
                    <div class="mt-6 flex flex-col items-center gap-4">
                        <span class="font-serif italic text-xl text-floria-dark/80">{{ product.price }} EGP</span>
                        <button @click="cart.addToCart(product)"
                            :disabled="!product.in_stock"
                            class="w-full mt-2 text-[10px] font-bold uppercase tracking-widest text-floria-green border border-floria-green/30 px-8 py-4 hover:bg-floria-green hover:text-white disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-floria-green transition-all duration-500">
                            Add to Basket
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- No Results State -->
        <div v-else class="py-20 text-center space-y-4">
            <p class="font-serif italic text-2xl text-floria-dark/40">No fragrances match your search...</p>
            <button @click="searchQuery = ''" class="text-floria-green text-xs font-bold uppercase tracking-widest underline">View All Collections</button>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useCartStore } from '@/stores/cart';

const cart = useCartStore();
const searchQuery = ref('');

// المجموعة الكاملة بناءً على الصور المرفوعة
const products = ref([
    { 
        id: 1, 
        name: 'Rosera', 
        price: 650, 
        notes: 'Damask Rose & Velvet Musk', 
        in_stock: true, 
        image: '/src/assets/rosera.jpeg' 
    },
    { 
        id: 2, 
        name: 'Pomberry', 
        price: 620, 
        notes: 'Wild Pomegranate & Pink Hearts', 
        in_stock: true, 
        image: '/src/assets/pomberry.jpeg' 
    },
    { 
        id: 3, 
        name: 'Aventor', 
        price: 750, 
        notes: 'Deep Woods & Golden Sparks', 
        in_stock: true, 
        image: '/src/assets/aventor.jpeg' 
    },
    { 
        id: 4, 
        name: 'Stravia', 
        price: 620, 
        notes: 'Fresh Strawberry & Summer Leaf', 
        in_stock: true, 
        image: '/src/assets/stravia.jpeg' 
    },
    { 
        id: 5, 
        name: 'Golden Vanilla', 
        price: 680, 
        notes: 'Warm Vanilla & Midnight Stars', 
        in_stock: true, 
        image: '/src/assets/vanilla.jpeg' 
    },
    { 
        id: 6, 
        name: 'Sugaria', 
        price: 650, 
        notes: 'Sweet Candy & Pastel Dreams', 
        in_stock: false, 
        image: '/src/assets/sugaria.jpeg' 
    }
]);

// منطق البحث المتقدم (يبحث في الاسم والروائح)
const filteredProducts = computed(() => {
    const query = searchQuery.value.toLowerCase();
    return products.value.filter(product => 
        product.name.toLowerCase().includes(query) || 
        product.notes.toLowerCase().includes(query)
    );
});
</script>