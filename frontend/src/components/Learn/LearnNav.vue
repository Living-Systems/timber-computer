<template>
    <nav class="subnav subnav--pages | text-style-200 uppercase">
        <ol class="cluster cluster--stretched items-start">
            <li v-for="page in pages" :key="page.slug">
                <a 
                    :href="'/learn/' + page.attributes.slug" 
                    class="subnav__item | btn uppercase"
                    :class="getClass(page)">
                    <div class="subnav__item-title">
                        {{ page.attributes.title }}
                    </div>
                </a>
            </li>
        </ol>
    </nav>
</template>

<script setup>

const props = defineProps(['pages']);

const getClass=(page)=>{
    const splitUrl = window.location.href.split('/');
    const foundSlug = splitUrl[splitUrl.length-1];

    const foundIndex = props.pages.findIndex(item => item.attributes.slug == page.attributes.slug);
    const slugIndex = props.pages.findIndex(item => item.attributes.slug == foundSlug);

    if(slugIndex > foundIndex){
        return 'is-set';
    }
    if(page.attributes.slug == foundSlug){
        return 'is-current';
    } else return ''
};

</script>