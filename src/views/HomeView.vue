<template>
    <div class="pt-28 min-h-screen bg-stone-50">
        <!-- Hero Section -->
        <section class="relative flex flex-col md:flex-row items-center px-6 md:px-20 py-12 overflow-hidden">
            <div
                class="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-rose-200/40 rounded-full blur-[120px] -z-10">
            </div>

            <div class="w-full md:w-1/2 z-10 space-y-8 text-center md:text-left">
                <div class="space-y-2">
                    <h2 class="text-xs uppercase tracking-[0.5em] font-bold text-rose-500 opacity-80">Introducing
                        the Blossom Collection</h2>
                    <h1 class="text-6xl md:text-8xl font-sans text-stone-800 leading-[1.1]">
                        Rosera <br>
                        <span class="italic font-light text-rose-500 text-5xl md:text-7xl">Essence of Rose.</span>
                    </h1>
                </div>
                <div class="flex flex-col sm:flex-row items-center gap-6 justify-center md:justify-start">
                    <router-link to="/products"
                        class="bg-rose-500 text-white px-12 py-4 font-bold uppercase text-[10px] tracking-[0.2em] hover:bg-stone-800 transition-all duration-500 shadow-xl shadow-rose-500/20">
                        Shop Rosera
                    </router-link>
                </div>
            </div>

            <div class="w-full md:w-1/2 flex justify-center items-center mt-12 md:mt-0 relative">
                <div class="absolute w-72 h-72 border border-rose-300/50 rounded-full animate-pulse"></div>
                <img src="@/assets/rosera.jpeg" alt="Rosera Bottle"
                    class="h-[350px] md:h-[500px] object-contain drop-shadow-2xl z-10" />
            </div>
        </section>

        <!-- Brand Story & Description Section (الوصف الجديد هنا) -->
        <section class="py-24 bg-stone-50 border-t border-rose-100">
            <div class="container mx-auto px-6 max-w-5xl">
                <div class="grid md:grid-cols-2 gap-16 items-start">

                    <!-- Column 1: Philosophy -->
                    <div class="space-y-6">
                        <h3 class="text-rose-500 text-[10px] uppercase tracking-[0.4em] font-black">Our Philosophy
                        </h3>
                        <p class="font-sans text-3xl text-stone-800 italic leading-snug">
                            "Beauty should be simple, effective, and feel as good as it looks."
                        </p>
                        <div class="space-y-4 text-stone-600 font-light leading-relaxed">
                            <p>Floria is a modern cosmetics concept dedicated to creating natural, skin-friendly
                                products that blend care with elegance.</p>
                            <p>Each formula is thoughtfully crafted to deliver visible results while offering a refined,
                                elegant feel.</p>
                        </div>
                    </div>

                    <!-- Column 2: The Experience -->
                    <div class="space-y-6 bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-stone-100">
                        <h3 class="text-rose-500 text-[10px] uppercase tracking-[0.4em] font-black">The Experience
                        </h3>
                        <div class="space-y-4 text-stone-700 text-sm leading-relaxed font-normal">
                            <p>Floria body splashes are not just about fragrance — they are designed as a complete skin
                                experience.</p>
                            <p>The formula helps to <strong>lightly hydrate</strong> the skin, support its natural
                                balance, and provide <strong>antioxidant protection</strong> against daily stress.</p>
                            <p>With carefully selected ingredients, each splash also offers a <strong>gentle
                                    antimicrobial effect</strong>, helping the skin feel fresh and clean throughout the
                                day.</p>
                            <p>The scent is crafted to be noticeable yet elegant — designed to last longer than typical
                                body sprays while remaining soft and wearable.</p>
                        </div>
                    </div>

                </div>

                <!-- Conclusion Tagline -->
                <div class="mt-20 text-center border-b border-rose-200 pb-12">
                    <p class="text-stone-800 font-sans italic text-2xl">
                        A refreshing, skin-friendly mist that combines care, comfort, and long-lasting fragrance.
                    </p>
                </div>
            </div>
        </section>
    </div>
</template>