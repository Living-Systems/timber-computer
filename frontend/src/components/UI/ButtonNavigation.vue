<template>
    <nav class="cluster cluster--y-gap | pt-300">
        <a v-for="page in pages"
           :key="page.attributes.slug"
           :class="'btn btn--xl btn--' + style + ' | w-full lg:w-1/2'"
           :href="learn ? '/learn/' + page.attributes.slug : page.attributes.slug">
            <span v-if="page.label" class="whitespace-pre-line text-center">
                {{ page.label + ': \n' + page.attributes.title}}
            </span>
            <span v-else>
                {{ page.attributes.title }}
            </span>
        </a>
    </nav>
</template>


<script setup>
import { computed } from 'vue';

const props = defineProps(['pages', 'style', 'computer', 'learn']);

</script>

