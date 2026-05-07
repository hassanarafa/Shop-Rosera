<template>
    <nav
        class="fixed top-4 inset-x-4 md:inset-x-8 z-50 bg-white/70 backdrop-blur-xl rounded-full border border-white/50 shadow-sm transition-all duration-300">
        <div class="container mx-auto px-6 md:px-8 h-20 flex items-center justify-between relative">

            <!-- 1. Logo -->
            <router-link to="/" class="z-[70]">
                <img src="@/assets/logo-swirl.png" alt="Floria" class="h-16 w-auto object-contain" />
            </router-link>

            <!-- 2. Minimal Trigger (Center) -->
            <button @click="isSidebarOpen = true"
                class="absolute left-1/2 -translate-x-1/2 group flex items-center gap-3 p-4">
                <div class="flex flex-col gap-1.5">
                    <span
                        class="w-5 h-[2px] rounded-full bg-stone-800/60 group-hover:w-8 transition-all duration-500"></span>
                    <span
                        class="w-8 h-[2px] rounded-full bg-stone-800/60 group-hover:w-5 transition-all duration-500"></span>
                </div>
            </button>

            <!-- 3. Basket -->
            <router-link to="/checkout" class="flex items-center gap-2 group z-[70]">
                <div
                    class="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500 group-hover:text-rose-500 transition">
                    Basket</div>
                <span class="text-[10px] font-medium text-stone-800">(0)</span>
            </router-link>
        </div>
    </nav>

    <!-- 4. Ultra-Simple Sidebar -->
    <transition name="fade-slide">
        <div v-if="isSidebarOpen" class="fixed inset-0 z-[100] flex justify-end">
            <!-- Glass Overlay -->
            <div class="absolute inset-0 bg-white/20 backdrop-blur-md" @click="isSidebarOpen = false"></div>

            <!-- Content -->
            <div
                class="relative w-full max-w-sm bg-stone-50 h-full shadow-2xl flex flex-col p-12 justify-center rounded-l-3xl border-l border-white">

                <!-- Close Button -->
                <button @click="isSidebarOpen = false" class="absolute top-10 right-10 group">
                    <span
                        class="text-[10px] font-bold uppercase tracking-widest text-stone-400 group-hover:text-stone-800 transition">Close</span>
                </button>

                <!-- Clean Links -->
                <nav class="flex flex-col gap-8">
                    <router-link v-for="link in navLinks" :key="link.path" @click="isSidebarOpen = false"
                        :to="link.path"
                        class="text-4xl font-sans text-stone-800 hover:pl-4 hover:text-rose-500 transition-all duration-500 ease-out">
                        {{ link.name }}
                    </router-link>
                </nav>

                <!-- Admin Footer -->
                <div class="absolute bottom-12 left-12">
                    <router-link @click="isSidebarOpen = false" to="/admin/dashboard"
                        class="text-[9px] font-bold uppercase tracking-[0.3em] text-stone-400 hover:text-rose-500 transition">
                        Access Terminal
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
    { name: 'New Arrivals', path: '/products' },
    { name: 'Our Story', path: '/' }
];
</script>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
    transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

.fade-slide-enter-from,
.fade-slide-leave-to {
    transform: translateX(100%);
    opacity: 0;
}

nav a {
    position: relative;
}
</style>