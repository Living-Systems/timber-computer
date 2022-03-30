<template>
    <nav class="subnav subnav--pages | text-style-200 uppercase">
        <ol class="cluster cluster--stretched items-start">
            <li v-for="page in pages" :key="page.slug">
                <a
                    :href="'/learn/' + page.attributes.slug"
                    class="subnav__item | uppercase"
                    :class="getClass(page)">
                    <span>
                        {{ page.attributes.title }}
                    </span>
                </a>
            </li>
        </ol>
    </nav>
</template>

<script setup>

const props = defineProps(['pages', 'slug']);
const pages = props.pages;
const slug  = props.slug;

const getClass=(page)=>{
    const foundIndex = props.pages.findIndex(item => item.attributes.slug == page.attributes.slug);
    const slugIndex = props.pages.findIndex(item => item.attributes.slug == slug);

    if(slugIndex > foundIndex){
        return 'is-set';
    }
    if(page.attributes.slug == slug){
        return 'is-current';
    } else return ''
};

</script>