<template>
    <nav class="cluster cluster--y-gap | pt-300">
        <a v-for="page in pages"
           :key="page.attributes.slug"
           :class="buttonStyle + ' btn btn--xl | w-full lg:w-1/2'"
           :href="getLink(page)">
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

const props = defineProps(['pages', 'buttonStyle', 'computer', 'learn']);

const getLink = page => {
    if (props.learn && page.attributes.slug != '/computer'){
        return '/learn/' + page.attributes.slug
    } else return page.attributes.slug;
}

</script>

