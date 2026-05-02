<template>
    <nav class="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-floria-pink/30">
        <div class="container mx-auto px-6 h-28 flex items-center justify-between"> <router-link to="/" class="group flex items-center overflow-visible">
                <img 
                    src="@/assets/logo-swirl.png" 
                    alt="Floria Logo" 
                    class="h-20 w-auto object-contain group-hover:scale-105 transition-transform duration-300" 
                /> </router-link>

            <div class="hidden md:flex gap-12 text-[11px] font-bold uppercase tracking-[0.2em] text-floria-dark">
                <router-link to="/products" class="hover:text-floria-green transition border-b border-transparent hover:border-floria-gold pb-1">Collections</router-link>
                <router-link to="/products" class="hover:text-floria-green transition border-b border-transparent hover:border-floria-gold pb-1">New Arrivals</router-link>
                <router-link to="/" class="hover:text-floria-green transition border-b border-transparent hover:border-floria-gold pb-1">Our Story</router-link>
            </div>

            <div class="flex items-center gap-8">
                <button class="text-floria-green hover:text-floria-dark transition">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.2"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                </button>
                
                <router-link to="/checkout" class="relative group flex items-center gap-2">
                    <span class="text-[11px] font-bold uppercase text-floria-dark">Basket</span>
                    <div class="bg-floria-green text-white text-[10px] w-6 h-6 rounded-full flex items-center justify-center font-bold shadow-md shadow-floria-green/20 group-hover:scale-110 transition">
                        0
                    </div>
                </router-link>
            </div>
        </div>
    </nav>
</template>

<style scoped>
/* إضافة لمسة انسيابية بسيطة */
.router-link-active {
    color: var(--color-floria-green);
}
</style>