<script setup>

const props = defineProps(['modalStatus'])

</script>

<template>
    <div v-if="modalStatus" class="flex z-[1000] fixed top-0 left-0 w-full h-full bg-black/80 items-center justify-center">
        <div class="lg:w-1/2 mx-auto bg-white drop-shadow-lg p-6 rounded-md">
            <button type="button" class="flex items-center justify-center h-8 w-8 text-white bg-black rounded-full absolute top-[-15px] right-[-15px] hover:bg-blue-500" @click="$emit('toggleModal')">
                <font-awesome-icon class="text-xl" icon="fa-solid fa-xmark" />
            </button>
            <slot></slot>
        </div>
    </div>
</template>