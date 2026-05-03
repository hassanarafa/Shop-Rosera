<template>
    <div class="flex min-h-screen bg-[#FDFCFB] pt-20">
        <!-- 1. Sidebar -->
        <aside class="w-64 bg-white border-r border-floria-pink/20 hidden md:block fixed h-full shadow-sm">
            <div class="p-8">
                <h2 class="text-xs uppercase tracking-[0.3em] font-black text-floria-green opacity-70 mb-10">Admin
                    Control</h2>
                <nav class="space-y-6">
                    <button @click="activeTab = 'overview'" :class="tabClass('overview')">
                        <span class="w-2 h-2 rounded-full border border-current mr-3"></span> Overview
                    </button>
                    <button @click="activeTab = 'orders'" :class="tabClass('orders')">
                        <span class="w-2 h-2 rounded-full border border-current mr-3"></span> Orders
                    </button>
                    <button @click="activeTab = 'products'" :class="tabClass('products')">
                        <span class="w-2 h-2 rounded-full border border-current mr-3"></span> Products
                    </button>
                </nav>
            </div>
        </aside>

        <!-- 2. Main Content Area -->
        <main class="flex-1 md:ml-64 p-8 md:p-12">

            <!-- Header -->
            <header class="mb-12">
                <h1 class="text-4xl font-serif text-floria-dark capitalize">{{ activeTab }}</h1>
                <p class="text-sm text-gray-400 mt-2 italic">Management and performance tracking for Floria.</p>
            </header>

            <!-- SECTION: OVERVIEW -->
            <section v-if="activeTab === 'overview'" class="space-y-10">
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div class="bg-white p-8 rounded-3xl border border-floria-pink/10 shadow-sm">
                        <p class="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-2">Total Sales</p>
                        <h3 class="text-3xl font-serif text-floria-dark">12,450 EGP</h3>
                    </div>
                    <div class="bg-white p-8 rounded-3xl border border-floria-pink/10 shadow-sm">
                        <p class="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-2">Orders</p>
                        <h3 class="text-3xl font-serif text-floria-dark">48</h3>
                    </div>
                    <div class="bg-white p-8 rounded-3xl border border-floria-pink/10 shadow-sm">
                        <p class="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-2">Avg. Basket</p>
                        <h3 class="text-3xl font-serif text-floria-dark">260 EGP</h3>
                    </div>
                </div>
            </section>

            <!-- SECTION: ORDERS -->
            <section v-if="activeTab === 'orders'"
                class="bg-white rounded-3xl border border-floria-pink/10 shadow-sm overflow-hidden">
                <table class="w-full text-left">
                    <thead class="bg-gray-50 border-b border-gray-100">
                        <tr class="text-[10px] uppercase tracking-widest font-bold text-gray-400">
                            <th class="p-6">Client Info</th>
                            <th class="p-6">Product & Qty</th>
                            <th class="p-6">Status</th>
                            <th class="p-6 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-50">
                        <tr v-for="order in orders" :key="order.id" class="hover:bg-gray-50/50 transition">
                            <td class="p-6">
                                <div class="font-bold text-floria-dark">{{ order.client }}</div>
                                <div class="text-xs text-gray-400">{{ order.address }} | {{ order.phone }}</div>
                            </td>
                            <td class="p-6 text-sm text-gray-600">
                                {{ order.product }} <span class="text-floria-green font-bold">x{{ order.qty }}</span>
                            </td>
                            <td class="p-6">
                                <span :class="statusBadge(order.status)">{{ order.status }}</span>
                            </td>
                            <td class="p-6 text-right">
                                <select v-model="order.status"
                                    class="text-[10px] font-bold uppercase border rounded-lg px-2 py-1 outline-none focus:ring-1 focus:ring-floria-green">
                                    <option value="pending">Pending</option>
                                    <option value="confirmed">Confirmed</option>
                                    <option value="delivered">Delivered</option>
                                </select>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </section>

            <!-- SECTION: PRODUCTS -->
            <section v-if="activeTab === 'products'" class="space-y-6">
                <div class="flex justify-between items-center mb-8">
                    <h2 class="text-xl font-serif text-floria-dark">Inventory Management</h2>
                    <button
                        class="bg-floria-green text-white px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-floria-dark transition">Add
                        New Product</button>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <!-- مثال لعرض المنتجات في لوحة التحكم -->
                    <div v-for="i in 3" :key="i"
                        class="bg-white p-4 rounded-2xl border border-gray-100 flex items-center gap-4">
                        <div class="w-16 h-16 bg-gray-50 rounded-xl"></div>
                        <div class="flex-1">
                            <p class="font-bold text-floria-dark">Rosera Splash</p>
                            <p class="text-xs text-gray-400">Price: 650 EGP</p>
                        </div>
                        <button class="text-[10px] font-bold text-floria-green uppercase hover:underline">Edit</button>
                    </div>
                </div>
            </section>

        </main>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const activeTab = ref('overview');

const orders = ref([
    { id: 1, client: 'Hassan Arafa', address: 'Tanta, Egypt', phone: '01012345678', product: 'Rosera', qty: 2, status: 'pending' },
    { id: 2, client: 'Sarah Ahmed', address: 'Cairo, Egypt', phone: '01198765432', product: 'Stravia', qty: 1, status: 'confirmed' },
    { id: 3, client: 'Omar Khaled', address: 'Alexandria, Egypt', phone: '01233445566', product: 'Aventor', qty: 3, status: 'delivered' },
]);

const tabClass = (tab) => {
    return [
        'flex items-center w-full text-[11px] font-bold uppercase tracking-[0.2em] transition-all duration-300',
        activeTab.value === tab ? 'text-floria-green translate-x-2' : 'text-floria-dark opacity-50 hover:opacity-100'
    ];
};

const statusBadge = (status) => {
    const base = 'px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-tighter ';
    if (status === 'pending') return base + 'bg-orange-50 text-orange-600';
    if (status === 'confirmed') return base + 'bg-blue-50 text-blue-600';
    if (status === 'delivered') return base + 'bg-green-50 text-green-600';
    return base;
};
</script>