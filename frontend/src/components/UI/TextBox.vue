<template>
    <section class="flow-200">
        <h1 class="p-box rounded-sm smoked-glass self-start">
            {{ heading }}
        </h1>
        <p class="p-box rounded-md smoked-glass text-style-600">
            {{ content }}
        </p>
    </section>
</template>

<script setup>
import {ref} from 'vue';

const props = defineProps(['heading', 'content']);

const heading = ref(props.heading);
const content = ref(props.content);

</script>