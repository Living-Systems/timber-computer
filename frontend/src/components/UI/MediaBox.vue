<template>
    <div v-if="image"
         class="media-box"
         :class="boxClass + [rounded && !isSvg(image.mime) ? ' rounded-md' : '']"
         :style="ratio ? getPadding(image.height,image.width) : ''">
        <img :srcset="getSrcSet(image.mime, image.formats)"
             :src="root + image.url"
             :sizes="sizes ? sizes : '100vw'"
             :alt="getAlternativeText()"
             :width="image.width"
             :height="image.height"
             :class="imgClass"
             :loading="lazy ? 'lazy' : 'eager'"
        >
    </div>
</template>

<script setup>
// Get props
const props     = defineProps(['image', 'sizes', 'alt', 'lazy', 'ratio', 'alt', 'boxClass', 'imgClass', 'rounded']);

const root      = import.meta.env.PUBLIC_SERVER_URL;
const image     = props.image.data.attributes;
const sizes     = props.sizes;
const lazy      = props.lazy;
const ratio     = props.ratio;

const getSrcSet = (mime, formats)=> {
    if (mime === 'image/svg+xml') {
        return
    }
    let srcSet = '';
    for (const [format, value] of Object.entries(formats)) {
        srcSet += `${root}${value.url} ${value.width}w,`;
    }
    return srcSet;
}

const getAlternativeText = ()=> {
    // Default alt content
    let alt = '';

    // Define alt Tag via props
    if (props.alt) {
        alt = props.alt;

    // Or Define show alt tag if different from file name
    } else if (image.alternativeText !== image.name) {
        alt = image.alternativeText;
    }

    return alt;
}

const getPadding = (height, width)=> {
    let padding = `--aspect-ratio: ${height / width}`;
    return padding;
}

const isSvg  = (mime)=> {
    return mime === 'image/svg+xml';
}

</script>