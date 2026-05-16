<template>
    <div class="flex min-h-screen bg-stone-50 pt-28 pb-12 px-6 md:px-12 gap-8 md:gap-12">
        <!-- 1. Sidebar -->
        <aside
            class="w-64 bg-white/70 backdrop-blur-xl border border-white/50 rounded-[2rem] hidden md:block sticky top-28 h-[calc(100vh-144px)] shadow-sm">
            <div class="p-8">
                <h2 class="text-[10px] uppercase tracking-[0.3em] font-black text-rose-500 opacity-70 mb-10">Admin
                    Control</h2>
                <nav class="space-y-6">
                    <button @click="activeTab = 'overview'" :class="tabClass('overview')">
                        <span class="w-2 h-2 rounded-full border border-current mr-3 transition-all"
                            :class="activeTab === 'overview' ? 'bg-rose-500' : ''"></span> Overview
                    </button>
                    <button @click="activeTab = 'orders'" :class="tabClass('orders')">
                        <span class="w-2 h-2 rounded-full border border-current mr-3 transition-all"
                            :class="activeTab === 'orders' ? 'bg-rose-500' : ''"></span> Orders
                    </button>
                    <button @click="activeTab = 'products'" :class="tabClass('products')">
                        <span class="w-2 h-2 rounded-full border border-current mr-3 transition-all"
                            :class="activeTab === 'products' ? 'bg-rose-500' : ''"></span> Products
                    </button>
                </nav>
            </div>
        </aside>

        <!-- 2. Main Content Area -->
        <main class="flex-1">

            <!-- Header -->
            <header class="mb-12">
                <h1 class="text-4xl md:text-6xl font-serif text-stone-800 capitalize tracking-tighter">{{ activeTab }}
                </h1>
                <p class="text-sm text-stone-500 mt-2 italic font-serif">Management and performance tracking for Floria.
                </p>
            </header>

            <!-- SECTION: OVERVIEW -->
            <section v-if="activeTab === 'overview'" class="space-y-10">
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div class="bg-white/70 backdrop-blur-xl p-8 rounded-[2rem] border border-white/50 shadow-sm">
                        <p class="text-[10px] uppercase tracking-widest text-stone-400 font-bold mb-2">Total Sales</p>
                        <h3 class="text-3xl md:text-4xl font-serif text-stone-800">{{ totalSales.toLocaleString() }}
                            <span class="text-lg text-rose-500 italic font-light">EGP</span>
                        </h3>
                    </div>
                    <div class="bg-white/70 backdrop-blur-xl p-8 rounded-[2rem] border border-white/50 shadow-sm">
                        <p class="text-[10px] uppercase tracking-widest text-stone-400 font-bold mb-2">Orders</p>
                        <h3 class="text-3xl md:text-4xl font-serif text-stone-800">{{ totalOrdersCount }}</h3>
                    </div>
                    <div class="bg-white/70 backdrop-blur-xl p-8 rounded-[2rem] border border-white/50 shadow-sm">
                        <p class="text-[10px] uppercase tracking-widest text-stone-400 font-bold mb-2">Avg. Basket</p>
                        <h3 class="text-3xl md:text-4xl font-serif text-stone-800">{{ avgBasketValue.toLocaleString() }}
                            <span class="text-lg text-rose-500 italic font-light">EGP</span>
                        </h3>
                    </div>
                </div>
            </section>

            <!-- SECTION: ORDERS -->
            <section v-if="activeTab === 'orders'"
                class="bg-white/70 backdrop-blur-xl rounded-[2rem] border border-white/50 shadow-sm overflow-hidden p-2 md:p-4">
                <div class="overflow-x-auto">
                    <table class="w-full text-left border-collapse">
                        <thead class="border-b border-stone-100">
                            <tr class="text-[10px] uppercase tracking-[0.2em] font-bold text-stone-400">
                                <th class="p-6 font-medium">Client Info</th>
                                <th class="p-6 font-medium">Product & Qty</th>
                                <th class="p-6 font-medium">Status</th>
                                <th class="p-6 text-right font-medium">Actions</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-stone-50">
                            <tr v-for="order in orders" :key="order.id"
                                class="hover:bg-stone-50/50 transition-colors duration-300">
                                <td class="p-6">
                                    <div class="font-bold text-stone-800">{{ order.client }}</div>
                                    <div class="text-xs text-stone-500 mt-1">{{ order.address }} <span
                                            class="mx-1 text-stone-300">|</span> {{ order.phone }}</div>
                                </td>
                                <td class="p-6 text-sm text-stone-600">
                                    {{ order.product }} <span class="text-rose-500 font-bold ml-1">x{{ order.qty
                                    }}</span>
                                </td>
                                <td class="p-6">
                                    <span :class="statusBadge(order.status)">{{ order.status }}</span>
                                </td>
                                <td class="p-6 text-right">
                                    <select v-model="order.status"
                                        class="text-[10px] font-bold uppercase tracking-widest border border-stone-200 rounded-xl px-3 py-2 outline-none focus:border-rose-300 focus:ring-1 focus:ring-rose-300 bg-transparent text-stone-600 transition-all cursor-pointer">
                                        <option value="pending">Pending</option>
                                        <option value="confirmed">Confirmed</option>
                                        <option value="delivered">Delivered</option>
                                    </select>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            <!-- SECTION: PRODUCTS -->
            <section v-if="activeTab === 'products'" class="space-y-8">
                <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <h2 class="text-2xl font-serif text-stone-800 tracking-tight">Inventory Management</h2>
                    <button @click="openAddModal"
                        class="bg-rose-500 text-white px-8 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-stone-800 transition-all duration-500 shadow-xl shadow-rose-500/20">
                        Add New Product
                    </button>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div v-for="product in products" :key="product.id"
                        class="bg-white/70 backdrop-blur-xl p-4 rounded-[2rem] border border-white/50 shadow-sm flex items-center gap-5 group hover:shadow-md transition-all duration-500">
                        <div
                            class="w-20 h-24 bg-rose-50/50 rounded-2xl overflow-hidden relative border border-rose-100/50 flex items-center justify-center p-2">
                            <img :src="product.image" class="h-full object-contain mix-blend-multiply" />
                        </div>
                        <div class="flex-1 space-y-1">
                            <p class="font-serif text-xl text-stone-800 leading-tight">{{ product.name }}</p>
                            <p class="text-xs text-stone-500 font-light italic">{{ product.price }} EGP</p>
                            <p class="text-[9px] font-bold uppercase tracking-widest mt-1"
                                :class="product.in_stock ? 'text-emerald-500' : 'text-rose-500'">
                                {{ product.in_stock ? 'In Stock' : 'Out of Stock' }}
                            </p>
                        </div>
                        <button @click="openEditModal(product)"
                            class="text-[10px] font-bold text-rose-500 uppercase hover:text-stone-800 transition-colors tracking-widest pr-2">Edit</button>
                    </div>
                </div>
            </section>

        </main>

        <!-- Product Modal -->
        <Transition enter-active-class="transition duration-300 ease-out" enter-from-class="opacity-0 scale-95"
            enter-to-class="opacity-100 scale-100" leave-active-class="transition duration-200 ease-in"
            leave-from-class="opacity-100 scale-100" leave-to-class="opacity-0 scale-95">
            <div v-if="showProductModal"
                class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/50 backdrop-blur-sm">
                <div class="bg-white rounded-[2rem] p-8 w-full max-w-md shadow-2xl relative">
                    <button @click="closeModal"
                        class="absolute top-6 right-6 text-stone-400 hover:text-rose-500 transition-colors">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                    <h3 class="text-2xl font-serif text-stone-800 mb-6">{{ isEditing ? 'Edit Product' : 'Add NewProduct'
                        }}</h3>
                    <form @submit.prevent="saveProduct" class="space-y-4">
                        <div>
                            <label
                                class="block text-[10px] font-bold uppercase tracking-widest text-stone-500 mb-2">Name</label>
                            <input v-model="productForm.name" type="text" required
                                class="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 outline-none focus:border-rose-300 focus:ring-1 focus:ring-rose-300 text-sm">
                        </div>
                        <div>
                            <label
                                class="block text-[10px] font-bold uppercase tracking-widest text-stone-500 mb-2">Price
                                (EGP)</label>
                            <input v-model="productForm.price" type="number" required
                                class="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 outline-none focus:border-rose-300 focus:ring-1 focus:ring-rose-300 text-sm">
                        </div>
                        <div>
                            <label
                                class="block text-[10px] font-bold uppercase tracking-widest text-stone-500 mb-2">Stock
                                Status</label>
                            <select v-model="productForm.in_stock"
                                class="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 outline-none focus:border-rose-300 focus:ring-1 focus:ring-rose-300 text-sm">
                                <option :value="true">In Stock</option>
                                <option :value="false">Out of Stock</option>
                            </select>
                        </div>
                        <button type="submit"
                            class="w-full mt-4 bg-rose-500 text-white px-8 py-4 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-stone-800 transition-all duration-500 shadow-xl shadow-rose-500/20">
                            {{ isEditing ? 'Save Changes' : 'Add Product' }}
                        </button>
                    </form>
                </div>
            </div>
        </Transition>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const activeTab = ref('overview');

const orders = ref([
    { id: 1, client: 'Hassan Arafa', address: 'Tanta, Egypt', phone: '01012345678', product: 'Rosera', qty: 2, price: 650, status: 'pending' },
    { id: 2, client: 'Sarah Ahmed', address: 'Cairo, Egypt', phone: '01198765432', product: 'Stravia', qty: 1, price: 620, status: 'confirmed' },
    { id: 3, client: 'Omar Khaled', address: 'Alexandria, Egypt', phone: '01233445566', product: 'Aventor', qty: 3, price: 750, status: 'delivered' },
]);

const products = ref([
    { id: 1, name: 'Rosera', price: 650, in_stock: true, image: '/rosera.jpeg' },
    { id: 2, name: 'Pomberry', price: 620, in_stock: true, image: '/pomberry.jpeg' },
    { id: 3, name: 'Aventor', price: 750, in_stock: true, image: '/aventor.jpeg' },
    { id: 4, name: 'Stravia', price: 620, in_stock: true, image: '/stravia.jpeg' },
    { id: 5, name: 'Golden Vanilla', price: 680, in_stock: true, image: '/vanilla.jpeg' },
    { id: 6, name: 'Sugaria', price: 650, in_stock: false, image: '/sugaria.jpeg' }
]);

// Overview Metrics
const totalSales = computed(() => {
    return orders.value
        .filter(o => o.status === 'delivered')
        .reduce((sum, order) => sum + (order.price * order.qty), 0);
});

const totalOrdersCount = computed(() => orders.value.length);

const avgBasketValue = computed(() => {
    if (totalOrdersCount.value === 0) return 0;
    const total = orders.value.reduce((sum, order) => sum + (order.price * order.qty), 0);
    return Math.round(total / totalOrdersCount.value);
});

// Modal Logic for Products
const showProductModal = ref(false);
const isEditing = ref(false);
const productForm = ref({ id: null, name: '', price: '', in_stock: true, image: '' });

const openAddModal = () => {
    isEditing.value = false;
    productForm.value = { id: null, name: '', price: '', in_stock: true, image: '/rosera.jpeg' }; // Using a default fallback image
    showProductModal.value = true;
};

const openEditModal = (product) => {
    isEditing.value = true;
    productForm.value = { ...product };
    showProductModal.value = true;
};

const closeModal = () => {
    showProductModal.value = false;
};

const saveProduct = () => {
    if (isEditing.value) {
        const index = products.value.findIndex(p => p.id === productForm.value.id);
        if (index !== -1) {
            products.value[index] = { ...productForm.value };
        }
    } else {
        products.value.push({
            ...productForm.value,
            id: Date.now()
        });
    }
    closeModal();
};

const tabClass = (tab) => {
    return [
        'flex items-center w-full text-[11px] font-bold uppercase tracking-[0.2em] transition-all duration-300 outline-none',
        activeTab.value === tab ? 'text-rose-500 translate-x-2' : 'text-stone-500 hover:text-stone-800 hover:translate-x-1'
    ];
};

const statusBadge = (status) => {
    const base = 'px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border ';
    if (status === 'pending') return base + 'bg-orange-50 border-orange-100 text-orange-600';
    if (status === 'confirmed') return base + 'bg-blue-50 border-blue-100 text-blue-600';
    if (status === 'delivered') return base + 'bg-emerald-50 border-emerald-100 text-emerald-600';
    return base;
};
</script>