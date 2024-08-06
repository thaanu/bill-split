<script setup>
import {ref, onMounted} from "vue";
import { Head, Link } from '@inertiajs/vue3';

let navLinks;

defineProps({
    canLogin: {
        type: Boolean,
    },
    canRegister: {
        type: Boolean,
    }
});

onMounted(() => {
    navLinks = document.querySelector('.nav-links');
})

const onToggleMenu = (e) => { 
    e.preventDefault();
    e.name = e.name === 'menu' ? 'close' : 'menu';
    navLinks.classList.toggle('top-[6%]');
}

</script>

<template>
    <div class="bg-blue-800">
        <nav class="flex justify-between md:justify-normal items-center w-[92%] mx-auto p-3 ">
            <div class="w-12"> 
                <img src="/assets/vt-logo-transparent.png" alt="Codered Logo" class="w-10">
            </div> 
            <div class="nav-links duration-500 md:static absolute md:min-h-fit min-h-[60vh] left-0 top-[-100%] md:w-auto w-full flex items-center px-5 bg-blue-800"> 
                <ul class="flex md:flex-row flex-col md:items-center md:gap-3 gap-8 text-sm"> 
                    <li><a class="text-white hover:bg-blue-600 p-3 rounded-lg" href="/">Home</a></li> 
                    <li>
                        <Link
                            v-if="$page.props.auth.user"
                            :href="route('dashboard')"
                            class="text-white hover:bg-blue-600 p-3 rounded-lg"
                        >
                            Dashboard
                        </Link>
                        <template v-else>
                            <Link
                                :href="route('login')"
                                class="text-white hover:bg-blue-600 p-3 rounded-lg"
                            >
                                Login
                            </Link>
                            <Link
                                v-if="canRegister"
                                :href="route('register')"
                                class="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                            >
                                Register
                            </Link>
                        </template>
                    </li>
                </ul> 
            </div> 
            <div class="flex items-center gap-6"> 
                <button type="button" @click="onToggleMenu" class="cursor-pointer md:hidden text-white text-sm bg-blue-600 px-4 p-2 rounded-lg">
                    <font-awesome-icon icon="fa-solid fa-bars" />
                </button>
            </div> 
        </nav> 
    </div>
</template>