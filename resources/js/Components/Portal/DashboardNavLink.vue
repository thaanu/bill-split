<script setup>
import { computed } from 'vue';
import { Link } from '@inertiajs/vue3';

const props = defineProps({
    enabled: Boolean,
    href: String,
    label: String,
    icon: String,
    error: String
})

</script>
<template>
    <div class="basis-1/2 p-1 lg:basis-1/4 lg:p-0">
        <Link v-if="props.enabled" :href="props.href" class="hover:dark:bg-gray-700 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all bg-white overflow-hidden shadow-xl rounded-lg px-3 py-10 flex justify-center items-center flex-col dark:bg-gray-800 border-b border-gray-100 dark:border-gray-800 hover:dark:border-gray-800 dark:text-gray-200 text-gray-700">
            <font-awesome-icon class="text-5xl mb-3 dark:text-gray-200" :icon="props.icon" icon="fa-solid" />
            {{ props.label }}
        </Link>
        <div v-if="!props.enabled" class="opacity-[75%] bg-white overflow-hidden shadow-sm rounded-lg px-3 py-10 flex justify-center items-center flex-col dark:bg-gray-800 border-b border-gray-100 dark:border-gray-800 dark:text-gray-200">
            <font-awesome-icon class="text-5xl mb-3 text-gray-700 dark:text-gray-200" :icon="props.icon" icon="fa-solid" />
            {{ props.label }}
        </div>
    </div>
</template>