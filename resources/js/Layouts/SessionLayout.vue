<script setup>
import Navbar from '../Components/Navbar.vue'
</script>
<template>
    <Navbar />
    
    <slot></slot>

    <footer class="fixed bottom-0 left-0 p-5 w-full text-center border-t-gray-100 border-t border-solid text-sm bg-white">
        <p>Codered &copy; 2024</p>
    </footer>
    <div class="h-[50px]"></div>
</template>