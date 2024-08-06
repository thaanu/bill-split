<script setup>
import PortalLayout from '@/Layouts/PortalLayout.vue';
import ApplicationLogo from '@/Components/ApplicationLogo.vue';
import DashboardNavLink from '@/Components/Portal/DashboardNavLink.vue';
import WidgetCard from '@/Components/WidgetCard.vue';
import CustomerCard from '@/Components/Portal/CustomerCard.vue';
import PageHeader from '@/Components/Portal/PageHeader.vue';
import Alert from '@/Components/Portal/Alerts.vue';
import { Link } from '@inertiajs/vue3';
import { ref, computed, onMounted, onBeforeMount } from 'vue';
import { useToast } from 'vue-toastification';

const toast = useToast();

const props = defineProps({
    user: Object,
    customer: Object,
    canSend: false,
    canReceive: false
});

const NavLinks = [
    {
        label: "Send Money",
        route: route('wu.send'),
        icon: "fa-money-bill-transfer",
        enabled: false,
        error: "You must be a member"
    },
    {
        label: "Recieve Money",
        route: "/",
        icon: "fa-wallet",
        enabled: false,
        error: "You must be a member"
    },
    {
        label: "Requests",
        route: route('requests'),
        icon: "fa-ticket",
        enabled: true,
        error: ""
    },
    {
        label: "Profile",
        route: route('profile.show'),
        icon: "fa-user",
        enabled: true,
        error: ""
    }
]

const kycExpired = computed(() => {
    if ( props.customer == undefined ) { return true; }
    if ( props.customer?.kyc_status == 'DRAFT' ) { return true; }
});

let customerInfo = ref({});

onMounted(() => {
    // Redirect to customer form
    if( props.customer.length == 0 ){
        window.location.href = route('customer.create');
    }
    customerInfo.value.first_name       = props.customer.first_name ?? user.first_name;
    customerInfo.value.last_name        = props.customer.last_name ?? user.last_name;
    customerInfo.value.email_address    = props.customer.email_address ?? user.email_address;
    customerInfo.value.contact_number   = props.customer.contact_number ?? user.contact_number;
});

</script>

<template>
    <PortalLayout title="Dashboard">
        
        <template #header>
            <PageHeader title="Dashboard" />
        </template>

        <!-- Main Content -->
        <div class="max-w-7xl my-5 mx-auto sm:px-6 lg:px-8 p-2">

            <!-- Important Notices -->
            <Alert v-if="kycExpired || customer.length == 0" messageType="warning">
                <div class="flex items-center justify-between w-full">
                    <div>To use Codered services, you must update your KYC.</div>
                    <Link class="border border-yellow-500 py-1 px-2 rounded-lg bg-yellow-500 text-yellow-200 hover:bg-yellow-600 active:bg-yellow-700" :href="route('customer.create')">Update KYC</Link>
                </div>
            </Alert>

            <Alert v-if="customer.kyc_status == 'IN-REVIEW'" messageType="info">
                <div class="flex items-center justify-between w-full">
                    <div>Your KYC is in review. Please check back later.</div>
                </div>
            </Alert>

            <Alert v-if="customer.kyc_status == 'REJECTED'" messageType="danger">
                <div class="flex items-center justify-between w-full">
                    <div>Your updated KYC was rejected. Please revise and send again.</div>
                    <Link class="border border-red-500 py-1 px-2 rounded-lg bg-red-500 text-red-200 hover:bg-red-600 active:bg-red-700" :href="route('customer.create')">Update KYC</Link>
                </div>
            </Alert>

            <!-- <Alert v-if="!customerInformation.isALCustomer" messageType="warning">
                To use Air Lines services, you must register a customer.
                <NavLink href="#">Register Air Lines Customer</NavLink>
            </Alert>
            <Alert v-if="!customerInformation.isMGCustomer" messageType="warning">
                To use Money Gram services, you must register a customer.
                <NavLink href="#">Register Money Gram Customer</NavLink>
            </Alert> -->
            
            <!-- Customer Section -->
            <div class="flex flex-col md:flex-row gap-4 mb-3">
                <div class="basis-1/2">
                    <WidgetCard class="mb-3 h-[100%]">
                        <ApplicationLogo class="block h-[100px] w-auto mb-5" />
                        <p class="text-xl">Welcome to Island Financial Services</p>
                    </WidgetCard>
                </div>
                <div class="basis-1/2">
                    <WidgetCard class="h-[100%]">
                        <CustomerCard :customer="customerInfo" />
                    </WidgetCard>
                </div>
            </div>

            <!-- Services -->
            <!-- <div class="mb-3">
                <WidgetCard>
                    <h3 class="mb-5 text-xl font-bold">Your Services</h3>
                    <div class="flex gap-3">
                        <div class=" rounded-full border border-gray-500 overflow-hidden w-[80px] h-[80px]">
                            <img src="/assets/wu-logo.webp" class="h-[100%]" alt="">
                        </div>
                        <div class=" rounded-full border border-gray-500 overflow-hidden w-[80px] h-[80px]">
                            <img src="/assets/wu-logo.webp" class="h-[100%]" alt="">
                        </div>
                    </div>
                </WidgetCard>
            </div> -->

            <!-- Control Panel -->
            <div class="flex flex-row flex-wrap lg:gap-4 lg:flex-nowrap">
                <template v-for="link in NavLinks">
                    <DashboardNavLink :label="link.label" :icon="link.icon" :href="link.route" :enabled="link.enabled" :error="link.error" />
                </template>
            </div>

        </div>

    </PortalLayout>
</template>
