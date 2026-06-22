<template>
    <nav
        class="fixed top-4 inset-x-4 md:inset-x-8 z-50 bg-white/70 backdrop-blur-xl rounded-full border border-white/50 shadow-sm">
        <div class="container mx-auto px-6 h-16 flex items-center justify-between relative">
            <!-- Logo -->
            <router-link to="/" class="z-[70]">
                <img src="@/assets/logo-swirl.png" alt="Floria" class="h-10 w-auto" />
            </router-link>

            <button @click="isSidebarOpen = true"
                class="absolute left-1/2 -translate-x-1/2 flex flex-col gap-1 group p-2">
                <span class="w-5 h-[1.5px] bg-stone-800 transition-all group-hover:w-8"></span>
                <span class="w-8 h-[1.5px] bg-stone-800 transition-all group-hover:w-5"></span>
            </button>

            <!-- Right side actions -->
            <div class="flex items-center gap-4">
                <router-link to="/dashboard"
                    class="text-[10px] font-bold uppercase tracking-widest text-stone-500 hover:text-stone-800 transition-colors hidden sm:block">
                    DASHBOARD
                </router-link>

                <!-- Basket Button -->
                <button @click="isBasketOpen = true" class="relative group p-2">
                    <svg class="w-5 h-5 text-stone-500 group-hover:text-stone-800 transition-colors" fill="none"
                        stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8"
                            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
                    </svg>
                    <span v-if="cart.totalItems > 0"
                        class="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center shadow">
                        {{ cart.totalItems }}
                    </span>
                </button>
            </div>
        </div>
    </nav>

    <transition name="pop-slide-left">
        <div v-if="isSidebarOpen" class="fixed inset-0 z-[100] flex justify-end items-start p-4 md:p-8">
            <div class="absolute inset-0 bg-stone-900/5 backdrop-blur-[2px]" @click="isSidebarOpen = false"></div>

            <div
                class="relative w-full max-w-[280px] bg-white/95 backdrop-blur-2xl rounded-[2rem] shadow-2xl shadow-stone-200/40 border border-stone-100 flex flex-col overflow-hidden">

                <button @click="isSidebarOpen = false"
                    class="absolute top-5 right-6 p-2 text-stone-400 hover:text-stone-900 transition">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>

                <div class="p-6 pt-14">
                    <p class="text-[9px] font-black uppercase tracking-[0.3em] text-stone-300 mb-6 px-3">Menu</p>

                    <nav class="flex flex-col gap-1">
                        <router-link v-for="link in navLinks" :key="link.path" :to="link.path"
                            @click="isSidebarOpen = false"
                            class="group flex items-center justify-between px-4 py-3 rounded-xl hover:bg-stone-50 transition-all">
                            <span
                                class="text-lg font-medium text-stone-700 group-hover:text-rose-500 transition-colors">
                                {{ link.name }}
                            </span>
                            <span class="opacity-0 group-hover:opacity-100 transition-opacity text-rose-300">→</span>
                        </router-link>
                    </nav>

                    <div class="my-6 mx-4 border-t border-stone-100"></div>

                    <router-link to="/dashboard" @click="isSidebarOpen = false" v-if="!isBasketOpen"
                        class="flex items-center gap-3 px-4 py-2 text-stone-400 hover:text-stone-900 transition group">
                        <div class="w-1.5 h-1.5 rounded-full bg-stone-200 group-hover:bg-rose-500 transition-colors">
                        </div>
                        <span class="text-[10px] font-bold uppercase tracking-[0.2em]">Terminal</span>
                    </router-link>
                </div>
            </div>
        </div>
    </transition>

    <!-- Basket Slide-out Panel -->
    <transition name="pop-slide-left">
        <div v-if="isBasketOpen" class="fixed inset-0 z-[100] flex justify-end items-start p-4 md:p-8">
            <div class="absolute inset-0 bg-stone-900/5 backdrop-blur-[2px]" @click="isBasketOpen = false"></div>

            <div
                class="relative w-full max-w-md bg-white/95 backdrop-blur-2xl rounded-[2rem] shadow-2xl shadow-stone-200/40 border border-stone-100 flex flex-col overflow-hidden">

                <button @click="isBasketOpen = false"
                    class="absolute top-5 right-6 p-2 text-stone-400 hover:text-stone-900 transition">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>

                <div class="p-6 pt-14 flex-1 flex flex-col">
                    <p class="text-[9px] font-black uppercase tracking-[0.3em] text-stone-300 mb-6 px-3">Your Basket
                    </p>

                    <!-- Cart Items -->
                    <div v-if="cart.items.length > 0" class="flex-1 space-y-4 overflow-y-auto pr-2">
                        <div v-for="item in cart.items" :key="item.id" class="flex items-center gap-4">
                            <div
                                class="w-16 h-20 bg-rose-50/50 rounded-xl border border-rose-100/50 flex items-center justify-center p-1">
                                <img :src="item.image" class="h-full object-contain mix-blend-multiply" />
                            </div>
                            <div class="flex-1">
                                <p class="font-serif text-lg text-stone-800">{{ item.name }}</p>
                                <p class="text-xs text-stone-500">{{ item.price }} EGP</p>
                            </div>
                            <div class="flex items-center gap-2">
                                <button @click="cart.decreaseQuantity(item.id)"
                                    class="w-6 h-6 rounded-full bg-stone-100 text-stone-500 hover:bg-stone-200">-</button>
                                <span class="text-sm font-bold w-4 text-center">{{ item.quantity }}</span>
                                <button @click="cart.increaseQuantity(item.id)"
                                    class="w-6 h-6 rounded-full bg-stone-100 text-stone-500 hover:bg-stone-200">+</button>
                            </div>
                            <button @click="cart.removeFromCart(item.id)"
                                class="text-stone-300 hover:text-rose-500 transition-colors p-1">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                            </button>
                        </div>
                    </div>

                    <!-- Empty Cart Message -->
                    <div v-else class="flex-1 flex flex-col items-center justify-center text-center space-y-4">
                        <p class="font-serif italic text-2xl text-stone-400">Your basket is empty.</p>
                        <router-link to="/products" @click="isBasketOpen = false"
                            class="text-rose-500 text-[10px] font-bold uppercase tracking-widest hover:text-stone-800 transition-colors">
                            Start Shopping
                        </router-link>
                    </div>

                    <!-- Cart Footer -->
                    <div v-if="cart.items.length > 0" class="mt-8 pt-6 border-t border-stone-100">
                        <div class="flex justify-between items-center font-bold text-stone-800">
                            <span class="text-sm uppercase tracking-widest">Total</span>
                            <span class="font-serif text-2xl">{{ cart.totalPrice.toLocaleString() }} <span
                                    class="text-lg text-rose-500 font-light italic">EGP</span></span>
                        </div>
                        <button
                            class="w-full mt-6 bg-rose-500 text-white px-8 py-4 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-stone-800 transition-all duration-500 shadow-xl shadow-rose-500/20">
                            Proceed to Checkout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script setup>
import { ref } from 'vue';
import { useCartStore } from '@/stores/cart';

const isSidebarOpen = ref(false);
const isBasketOpen = ref(false);

const cart = useCartStore();

const navLinks = [
    { name: 'Collections', path: '/products' },
    { name: 'New Arrivals', path: '/new-arrivals' },
    { name: 'Our Story', path: '/our-story' }
];
</script>

<style scoped>
/* A "Pop" animation feels smarter than a standard slide */
.pop-slide-left-enter-active {
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.1);
}

.pop-slide-left-leave-active {
    transition: all 0.3s cubic-bezier(0.4, 0, 1, 1);
}

.pop-slide-left-enter-from {
    transform: translateY(-20px) translateX(20px) scale(0.9);
    opacity: 0;
}

.pop-slide-left-leave-to {
    transform: translateY(-10px) translateX(10px) scale(0.95);
    opacity: 0;
}
</style>