<template>
    <nav class="subnav | text-style-200 uppercase">

        <ol class="cluster cluster--stretched items-start">

            <li v-for="page in pages" :key="page.slug">
                <a :href="'/learn/' + page.attributes.slug" class="subnav__item is-set">
                    <div class="subnav__group-title">
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