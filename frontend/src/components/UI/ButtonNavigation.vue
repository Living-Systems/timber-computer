<template>
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
</template>


<script setup>

const props = defineProps(['pages', 'buttonStyle', 'learn', 'share']);

const getLink = page => {
    if (props.learn && page.attributes.slug != '/computer'){
        return '/learn/' + page.attributes.slug
    } else return page.attributes.slug;
};

</script>

