<script setup>
import { Head, Link } from '@inertiajs/vue3';
import {ref, onMounted} from "vue";
import SessionLayout from '../Layouts/SessionLayout.vue'
import Carousel from '../Components/Carousel.vue';

function handleImageError() {
    document.getElementById('screenshot-container')?.classList.add('!hidden');
    document.getElementById('docs-card')?.classList.add('!row-span-1');
    document.getElementById('docs-card-content')?.classList.add('!flex-row');
    document.getElementById('background')?.classList.add('!hidden');
}


</script>

<template>
    <Head title="Codered Portal" />
    <SessionLayout>
        <Carousel/>

        <div class="py-5">
            
            <div class="w-5/6 mx-auto flex">
                <div class="w-2/3 p-5">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti perspiciatis officia ipsum, commodi quo distinctio placeat esse doloribus voluptatum vero dolorum nostrum pariatur alias sint sequi possimus? Ea, nostrum reiciendis.
                </div>
                <div class="w-1/3 p-5">
                    <div class="mb-5">
                        <h2 class="mb-5 text-xl font-bold">Send Money Online</h2>
                    </div>
                    <p>Use our online portal to transfer <span class="font-bold">Western Union</span> transactions with ease.</p>

                    <div class="my-6">
                        <Link
                            :href="route('dashboard')"
                            class="text-xl py-3 px-6 bg-yellow-500 hover:bg-yellow-400 hover:text-white transition ease-in-out rounded-[100px] inline font-bold"
                        >
                            <font-awesome-icon class="mr-1" icon="fa-solid fa-arrow-pointer" /> Money Transfer
                        </Link>
                    </div>
                </div>
            </div>

        </div>
    </SessionLayout>
</template>
