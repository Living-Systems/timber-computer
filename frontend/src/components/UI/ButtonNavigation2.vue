<template>
    <nav class="cluster cluster--y-gap | pt-300">
        <a v-for="page in pages"
           :key="page.slug"
           class="btn btn--xl btn--outline w-1/2"
           :href="'/learn/' + page.attributes.slug">
            <span>
                {{ page.attributes.title }}
            </span>
        </a>
    </nav>
</template>


<script setup>

    const props = defineProps(['pages']);

</script>

