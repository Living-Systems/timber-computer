<template>
    <section class="learn | px-body pb-600 flow-600">
        <template v-for="item in content" :key="item">
            <div
                v-if="item.markdown"
                v-html="micromark(item.markdown)"
                class="flow-200 prose measure"
            ></div>

            <figure v-if="item.image"
                    class="learn__figure"
                    :class="item.style ? 'learn__figure--' + item.style : null">
                <a v-if="item.url" :href="item.url">
                    <img
                        :src="root + item.image.data.attributes.url"
                        :alt="item.image.data.attributes.alternativeText"
                    >
                </a>


                <img
                    v-else
                    :src="root + item.image.data.attributes.url"
                    :alt="item.image.data.attributes.alternativeText"
                >
                <!--
                <figcaption v-if="item.image.data.attributes.caption.length">
                    {{ item.image.data.attributes.caption }}
                </figcaption>-->
                {{ style }}
            </figure>
        </template>
    </section>
</template>

<script setup>
    import { micromark } from 'micromark';

    console.log(props.content);

    const root  = import.meta.env.PUBLIC_SERVER_URL;
    const props = defineProps(['content']);
</script>
