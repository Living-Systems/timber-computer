<template>
    <div v-for="item in content" :key="item">
        <div v-if="item.markdown" v-html="item.markdown"></div>
        <div v-if="item.image">
            <a v-if="item.url" :href="item.url">
                <img :src="root + item.image.data.attributes.url" alt="">
            </a>
            <img v-else :src="root + item.image.data.attributes.url" alt="">
        </div>
    </div>
</template>

<script setup>
    const root  = import.meta.env.PUBLIC_SERVER_URL;
    const props = defineProps(['content']);
</script>
