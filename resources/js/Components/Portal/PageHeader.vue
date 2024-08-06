<script setup>
const props = defineProps({
    title: String
})
</script>
<template>
    <h2 class="font-semibold text-xl text-gray-800 leading-tight dark:text-gray-500">
        {{ props.title }}
    </h2>
</template>