<template>
    <nav class="subnav subnav--pages | text-style-200 uppercase">
        <ol class="cluster cluster--stretched items-start">
            <li v-for="page in pages" :key="page.slug">
                <a :href="'/learn/background/' + page.attributes.slug" class="subnav__item | btn uppercase is-set">
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

</script>