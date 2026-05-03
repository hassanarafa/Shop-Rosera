<template>
    <nav class="fixed top-0 w-full z-50 bg-white/40 backdrop-blur-xl">
        <div class="container mx-auto px-8 h-24 flex items-center justify-between relative">

            <!-- 1. Logo -->
            <router-link to="/" class="z-[70]">
                <img src="@/assets/logo-swirl.png" alt="Floria" class="h-14 w-auto object-contain" />
            </router-link>

            <!-- 2. Minimal Trigger (Center) -->
            <button @click="isSidebarOpen = true" 
                class="absolute left-1/2 -translate-x-1/2 group flex items-center gap-3 p-4">
                <div class="flex flex-col gap-1.5">
                    <span class="w-5 h-[1px] bg-floria-dark/60 group-hover:w-8 transition-all duration-500"></span>
                    <span class="w-8 h-[1px] bg-floria-dark/60 group-hover:w-5 transition-all duration-500"></span>
                </div>
            </button>

            <!-- 3. Basket -->
            <router-link to="/checkout" class="flex items-center gap-2 group z-[70]">
                <div class="text-[10px] font-bold uppercase tracking-[0.2em] text-floria-dark/40 group-hover:text-floria-green transition">Basket</div>
                <span class="text-[10px] font-medium text-floria-dark">(0)</span>
            </router-link>
        </div>
    </nav>

    <!-- 4. Ultra-Simple Sidebar -->
    <transition name="fade-slide">
        <div v-if="isSidebarOpen" class="fixed inset-0 z-[100] flex justify-end">
            <!-- Glass Overlay -->
            <div class="absolute inset-0 bg-white/20 backdrop-blur-md" @click="isSidebarOpen = false"></div>
            
            <!-- Content -->
            <div class="relative w-full max-w-sm bg-white h-full shadow-2xl flex flex-col p-12 justify-center">
                
                <!-- Close Button -->
                <button @click="isSidebarOpen = false" class="absolute top-10 right-10 group">
                    <span class="text-[10px] font-bold uppercase tracking-widest text-gray-300 group-hover:text-floria-dark transition">Close</span>
                </button>

                <!-- Clean Links -->
                <nav class="flex flex-col gap-8">
                    <router-link v-for="link in navLinks" :key="link.path"
                        @click="isSidebarOpen = false" :to="link.path" 
                        class="text-4xl font-serif text-floria-dark hover:pl-4 hover:text-floria-green transition-all duration-500 ease-out">
                        {{ link.name }}
                    </router-link>
                </nav>

                <!-- Admin Footer -->
                <div class="absolute bottom-12 left-12">
                    <router-link @click="isSidebarOpen = false" to="/admin/dashboard" 
                        class="text-[9px] font-bold uppercase tracking-[0.3em] text-gray-300 hover:text-floria-green transition">
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
.fade-slide-enter-active, .fade-slide-leave-active {
    transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

.fade-slide-enter-from, .fade-slide-leave-to {
    transform: translateX(100%);
    opacity: 0;
}

/* تنظيف الروابط عند الـ Hover */
nav a {
    position: relative;
}
</style>