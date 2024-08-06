<script setup>
import { onBeforeMount, ref } from 'vue';
import { Link } from '@inertiajs/vue3';

const props = defineProps({
    message: String,
    type: String,
    label: String,
    href: String
})

let icon = ref('');
let color = ref('');

onBeforeMount(() => {
    if ( props.type == 'success' ) {
        icon.value = 'fa-sold fa-check-circle';
        color.value = 'text-green-500';
    }
    if ( props.type == 'error' ) {
        icon.value = 'fa-sold fa-xmark-circle';
        color.value = 'text-red-500';
    }
})


</script>
<template>
    <div class="bg-white py-[100px] p-8 rounded-lg w-5/6 mx-auto my-5 text-center" >
        <font-awesome-icon :icon="icon" :class="color" class=" text-7xl mb-10" />
        <p>{{ message }}</p>
        <Link v-if="label && href" :href="href" class="mt-10 inline-block bg-gray-300 p-3 rounded-lg">{{ label }}</Link>
    </div>
</template>