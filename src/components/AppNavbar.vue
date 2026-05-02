<template>
    <nav class="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-floria-pink/30">
        <div class="container mx-auto px-6 h-28 flex items-center justify-between relative">

            <!-- 1. Floria Logo (Left) -->
            <router-link to="/" class="group flex items-center">
                <img src="@\assets\logo-swirl.png" alt="Floria Logo" class="h-20 w-auto object-contain" />
            </router-link>

            <!-- 2. Three Dots Menu (Center) -->
            <div class="absolute left-1/2 -translate-x-1/2 flex flex-col items-center">
                <button @click="isMenuOpen = !isMenuOpen"
                    class="group flex flex-col gap-1 items-center justify-center p-4 hover:opacity-70 transition-all">
                    <!-- الأيقونة: 3 نقاط عمودية أو أفقية بتصميم ناعم -->
                    <span class="w-1 h-1 bg-floria-green rounded-full group-hover:scale-125 transition"></span>
                    <span class="w-1 h-1 bg-floria-green rounded-full group-hover:scale-125 transition"></span>
                    <span class="w-1 h-1 bg-floria-green rounded-full group-hover:scale-125 transition"></span>
                </button>

                <!-- Dropdown Menu -->
                <transition name="fade">
                    <div v-if="isMenuOpen"
                        class="absolute top-full mt-2 w-48 bg-white border border-floria-pink/20 shadow-2xl rounded-xl p-4 z-50">
                        <div class="flex flex-col gap-4 text-center">
                            <router-link @click="isMenuOpen = false" to="/products"
                                class="text-[10px] font-bold uppercase tracking-widest text-floria-dark hover:text-floria-green">Collections</router-link>
                            <router-link @click="isMenuOpen = false" to="/products"
                                class="text-[10px] font-bold uppercase tracking-widest text-floria-dark hover:text-floria-green">New
                                Arrivals</router-link>
                            <router-link @click="isMenuOpen = false" to="/"
                                class="text-[10px] font-bold uppercase tracking-widest text-floria-dark hover:text-floria-green">Our
                                Story</router-link>
                        </div>
                    </div>
                </transition>
            </div>

            <!-- 3. Basket (Right) -->
            <div class="flex items-center gap-4">
                <router-link to="/checkout" class="relative group flex items-center gap-2">
                    <span class="text-[11px] font-bold uppercase text-floria-dark hidden sm:inline">Basket</span>
                    <div
                        class="bg-floria-green text-white text-[10px] w-6 h-6 rounded-full flex items-center justify-center font-bold shadow-md shadow-floria-green/20">
                        0
                    </div>
                </router-link>
            </div>
        </div>
    </nav>
</template>

<script setup>
import { ref } from 'vue';

// حالة فتح وإغلاق المنيو
const isMenuOpen = ref(false);
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
    transform: translateY(-10px);
}
</style>