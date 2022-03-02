<template>
    <div v-if="image"
         class="media-box"
         :class="boxClass">
        <img :srcset="root + image.data.attributes.formats.small.url + ' 500w,' +
                    root + image.data.attributes.formats.medium.url + ' 720w,' +
                    root + image.data.attributes.formats.large.url + ' 1000w,'"
             :src="root +image.data.attributes.formats.small.url"
             :sizes="sizes ? sizes : '100vw'"
             :alt="alt ? alt : ''"
             :loading="lazy ? 'lazy' : 'eager'"
        >
    </div>
</template>

<script setup>
// Get props
const props = defineProps(['image', 'src', 'width', 'sizes', 'lazy', 'alt', 'boxClass']);

// Default sizes, width, lazy, alt
// TODO: Define and output more widths
// let widths = width ? [width] : [320, 640, 800, 1024, 1440, 1920];

// Url
// TODO: replace with Astro resolve when on production server
const root  = import.meta.env.PUBLIC_SERVER_URL;

</script>