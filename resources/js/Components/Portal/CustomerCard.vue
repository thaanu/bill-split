<script setup>
import { Link } from '@inertiajs/vue3';

const props = defineProps({
    customer: Object
});

</script>

<template>
    <div class="w-full flex items-center flex-col md:flex-row px-3">
        <div>
            <div class="rounded-full overflow-hidden h-[100px] w-[100px] border border-gray-200 mb-5">
                <img src="/assets/profile-photo-placeholder.jpg" alt="User Profile" />
            </div>
        </div>
        <div class="px-5">
            <p class="text-xl uppercase font-bold mb-2">
                {{ customer.first_name }}
                {{ customer.last_name }}
            </p>
            <p class="mb-2">{{ customer.email_address }}</p>
            <p class="mb-2">{{ customer.contact_number }}</p>
        </div>
    </div>
</template>