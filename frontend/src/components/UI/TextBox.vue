<template>
    <section class="flow-200 measure"
             :class="boxClass">
        <h1 class="p-box rounded-sm smoked-glass self-start">
            {{ props.heading }}
        </h1>
        <div class="p-box rounded-md smoked-glass flow flow-600">
            <p>{{ props.content }}</p>
        </div>
    </section>
</template>

<script setup>

const props = defineProps(['heading', 'content', 'boxClass']);

</script>