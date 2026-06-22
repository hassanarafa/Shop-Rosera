<template>
    <nav
        class="fixed top-4 inset-x-4 md:inset-x-8 z-50 bg-white/70 backdrop-blur-xl rounded-full border border-white/50 shadow-sm">
        <div class="container mx-auto px-6 h-16 flex items-center justify-between relative">
            <router-link to="/" class="z-[70]">
                <img src="@/assets/logo-swirl.png" alt="Floria" class="h-10 w-auto" />
            </router-link>

            <button @click="isSidebarOpen = true"
                class="absolute left-1/2 -translate-x-1/2 flex flex-col gap-1 group p-2">
                <span class="w-5 h-[1.5px] bg-stone-800 transition-all group-hover:w-8"></span>
                <span class="w-8 h-[1.5px] bg-stone-800 transition-all group-hover:w-5"></span>
            </button>

            <router-link to="/dashboard"
                class="text-[10px] font-bold uppercase tracking-widest text-stone-500 hover:text-stone-800 transition-colors">
                Terminal
            </router-link>
        </div>
    </nav>

    <transition name="pop-slide">
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

                    <router-link to="/dashboard" @click="isSidebarOpen = false"
                        class="flex items-center gap-3 px-4 py-2 text-stone-400 hover:text-stone-900 transition group">
                        <div class="w-1.5 h-1.5 rounded-full bg-stone-200 group-hover:bg-rose-500 transition-colors">
                        </div>
                        <span class="text-[10px] font-bold uppercase tracking-[0.2em]">Terminal</span>
                    </router-link>
                </div>
            </div>
        </div>
    </transition>
</template>

<script setup>
import { ref } from 'vue';

const isSidebarOpen = ref(false);

const navLinks = [
    { name: 'Collections', path: '/products' },
    { name: 'New Arrivals', path: '/new-arrivals' },
    { name: 'Our Story', path: '/our-story' }
];
</script>

<style scoped>
/* A "Pop" animation feels smarter than a standard slide */
.pop-slide-enter-active {
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.1);
}

.pop-slide-leave-active {
    transition: all 0.3s cubic-bezier(0.4, 0, 1, 1);
}

.pop-slide-enter-from {
    transform: translateY(-20px) translateX(20px) scale(0.9);
    opacity: 0;
}

.pop-slide-leave-to {
    transform: translateY(-10px) translateX(10px) scale(0.95);
    opacity: 0;
}
</style>