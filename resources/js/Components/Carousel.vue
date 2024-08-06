<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { onMounted } from 'vue';

onMounted(() => {
  new Glide('.glide', {
    type: 'carousel'
  }).mount()
});
</script>


<template>
  <div class="glide">
  <div class="glide__track" data-glide-el="track">
    <ul class="glide__slides">
      <li class="glide__slide">
        <img src="https://placehold.it/1280x500" class="w-full" />
      </li>
      <li class="glide__slide">
        <img src="https://placehold.it/1280x500" class="w-full" />
      </li>
      <li class="glide__slide">
        <img src="https://placehold.it/1280x500" class="w-full" />
      </li>
    </ul>
  </div>
  <div class="glide__arrows" data-glide-el="controls">
    <button class="glide__arrow glide__arrow--left" data-glide-dir="<">
      <font-awesome-icon class="mr-1" icon="fa-solid fa-angle-left" />
    </button>
    <button class="glide__arrow glide__arrow--right" data-glide-dir=">">
      <font-awesome-icon class="mr-1" icon="fa-solid fa-angle-right" />
    </button>
  </div>

</div>

</template>