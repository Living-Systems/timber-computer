<template>
    <section class="flow flow-600">
        <div v-for="item in content" :key="item">
            <div
                v-if="item.markdown"
                v-html="micromark(item.markdown)"
                class="flow flow-200 prose"
            ></div>

            <div v-if="item.image">
                <figure class="flow flow-200">
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
        
                    <figcaption>{{ item.image.data.attributes.caption }}</figcaption>
                </figure>
            </div>
        </div>
    </section>
</template>

<script setup>
    import { micromark } from 'micromark';

    console.log(props.content);

    const root  = import.meta.env.PUBLIC_SERVER_URL;
    const props = defineProps(['content']);
</script>
