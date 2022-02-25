<template>
    <div class="bg-image" aria-hidden="true">
        <img :srcset="root + image.data.attributes.formats.small.url + ' 500w,' +
                    root + image.data.attributes.formats.medium.url + ' 720w,' +
                    root + image.data.attributes.formats.large.url + ' 992w,'"
             :src="root +image.data.attributes.url" alt=""
             sizes=""
             loading="lazy"
        >
    </div>
</template>

<script setup>
// TO DO: replace with Astro resolve when on production server
const root  = import.meta.env.PUBLIC_SERVER_URL;
const props = defineProps(['image']);
</script>
