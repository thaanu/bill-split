<script setup>
import {onBeforeMount, ref} from 'vue';

const props = defineProps({
    status: String
});

const statues = {
    waiting_for_slip : {
        message: "Waiting for transfer slip",
        color: "text-red-500",
        icon: "fa-solid fa-triangle-exclamation",
        spinning: false
    },
    ready_to_sync : {
        message: "Ready to submit",
        color: "text-blue-500",
        icon: "fa-solid fa-check-circle",
        spinning: false
    },
    waiting_for_sync: {
        message: "In Progress",
        color: "text-yellow-500",
        icon: "fa-solid fa-hourglass-half",
        spinning: true
    },
    error: {
        message: "Action Needed",
        color: "text-red-500",
        icon: "fa-solid fa-circle-exclamation",
        spinning: false
    },
    done: {
        message: "Transaction completed",
        color: "text-green-500",
        icon: "fa-solid fa-check-circle",
        spinning: false
    }
};

</script>

<template>
    <div class="flex gap-3 items-center">
        <font-awesome-icon class="text-xl" :class="statues[status].color" :spin="statues[status].spinning" :icon="statues[status].icon"  />
        <span class="text-sm">
            {{ statues[status].message }}
        </span>
    </div>
</template>