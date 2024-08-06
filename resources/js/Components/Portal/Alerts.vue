<script setup>

const props = defineProps({
    messageType: String,
    message: String
})

const messageType = () => {
    switch (props.messageType) {
        case "warning":
            return 'border bg-yellow-100 border-yellow-600 text-yellow-600 dark:bg-yellow-300';
            break;
        case "danger":
            return 'border bg-red-100 border-red-600 text-red-600 dark:bg-red-300';
            break;
        case "success":
            return 'border bg-green-100 border-green-600 text-green-600 dark:bg-green-300';
            break;
        case "info":
            return 'border bg-blue-100 border-blue-600 text-blue-600 dark:bg-blue-300';
            break;
        default:
            break;
    }
}

const getIcon = () => {
    switch (props.messageType) {
        case "warning":
            return "fa-circle-exclamation";
            break;
        case "danger":
            return "fa-circle-xmark";
            break;
        case "success":
            return "fa-circle-check";
            break;
        case "info":
            return "fa-circle-info";
            break;
        default:
            break;
    }
}

</script>
<template>
    <div class="shadow-md rounded-lg p-6 mb-3 flex items-center font-bold" :class="messageType()">
        <font-awesome-icon class="mr-2 text-2xl" :icon="getIcon()" icon="fa-solid" />
        {{ props.message }}
        <slot></slot>
    </div>
</template>