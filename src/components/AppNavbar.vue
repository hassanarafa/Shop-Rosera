<template>
    <nav
        class="fixed top-4 inset-x-4 md:inset-x-8 z-50 bg-white/70 backdrop-blur-xl rounded-full border border-white/50 shadow-sm">
        <div class="container mx-auto px-6 h-16 flex items-center justify-between relative">
            <router-link to="/" class="z-[70]">
                <img src="@/assets/logo-swirl.png" alt="Floria" class="h-12 w-auto" />
            </router-link>

            <button @click="isSidebarOpen = true" class="absolute left-1/2 -translate-x-1/2 flex flex-col gap-1 group">
                <span class="w-5 h-[1.5px] bg-stone-800 transition-all group-hover:w-8"></span>
                <span class="w-8 h-[1.5px] bg-stone-800 transition-all group-hover:w-5"></span>
            </button>

            <router-link to="/checkout" class="text-[10px] font-bold uppercase tracking-widest text-stone-500">
                Dashboard
            </router-link>
        </div>
    </nav>

    <transition name="smart-slide">
        <div v-if="isSidebarOpen" class="fixed inset-0 z-[100] flex justify-end p-4 md:p-6">
            <div class="absolute inset-0 bg-stone-900/5 backdrop-blur-[2px]" @click="isSidebarOpen = false"></div>

            <div
                class="relative w-full max-w-[320px] bg-white rounded-[2.5rem] shadow-2xl shadow-stone-200/50 flex flex-col overflow-hidden border border-stone-100">

                <button @click="isSidebarOpen = false"
                    class="absolute top-6 right-8 p-2 text-stone-400 hover:text-stone-900 transition">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>

                <div class="flex-grow flex flex-col p-8 pt-20">
                    <span
                        class="text-[10px] font-black uppercase tracking-[0.3em] text-stone-300 mb-8">Navigation</span>

                    <nav class="flex flex-col gap-2">
                        <router-link v-for="link in navLinks" :key="link.path" :to="link.path"
                            @click="isSidebarOpen = false"
                            class="group relative px-4 py-3 rounded-2xl hover:bg-stone-50 transition-all duration-300">
                            <span
                                class="relative z-10 text-xl font-medium text-stone-700 group-hover:text-rose-600 transition-colors">
                                {{ link.name }}
                            </span>
                        </router-link>
                    </nav>

                    <div class="mt-auto bg-stone-50 rounded-3xl p-5 border border-stone-100/50">
                        <p class="text-[9px] uppercase tracking-widest text-stone-400 font-bold mb-2">Summer '26</p>
                        <p class="text-sm text-stone-600 leading-relaxed mb-3">Explore the <b>Silk & Stem</b>
                            collection.</p>
                        <router-link to="/products"
                            class="text-[10px] font-bold text-rose-500 uppercase tracking-tighter">Shop Now
                            →</router-link>
                    </div>
                </div>

                <router-link to="/admin/dashboard" class="bg-stone-900 p-6 text-center group">
                    <span
                        class="text-[9px] font-bold uppercase tracking-[0.4em] text-stone-400 group-hover:text-white transition">
                        Access Terminal
                    </span>
                </router-link>
            </div>
        </div>
    </transition>
</template>

<script setup>
import { ref } from 'vue';

const isSidebarOpen = ref(false);

const navLinks = [
    { name: 'Collections', path: '/products' },
    { name: 'New Arrivals', path: '/products' },
    { name: 'Our Story', path: '/' }
];
</script>

<style scoped>
.smart-slide-enter-active,
.smart-slide-leave-active {
    transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.smart-slide-enter-from,
.smart-slide-leave-to {
    transform: translateX(110%) scale(0.9);
    opacity: 0;
}

/* Optional: Add a subtle pulse to the "Shop Now" for that 'smart' feel */
@keyframes softPulse {
    0% {
        opacity: 1;
    }

    50% {
        opacity: 0.7;
    }

    100% {
        opacity: 1;
    }
}
</style>