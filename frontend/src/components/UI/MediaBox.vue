<template>
    <div v-if="image"
         class="media-box"
         :class="boxClass">
        <img :srcset="root + image.data.attributes.formats.xxsmall.url + ' 160w,' +
                    root + image.data.attributes.formats.xsmall.url + ' 320w,' +
                    root + image.data.attributes.formats.small.url + ' 640w,' +
                    root + image.data.attributes.formats.medium.url + ' 800w,' +
                    root + image.data.attributes.formats.large.url + ' 1024w,' +
                    root + image.data.attributes.formats.xlarge.url + ' 1440w,' +
                    root + image.data.attributes.formats.xxlarge.url + ' 1920w,'"
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