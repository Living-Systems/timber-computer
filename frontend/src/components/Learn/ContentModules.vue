<template>
    <section class="learn | px-body pb-600 flow-600">
        <template v-for="item in content" :key="item">

            <!-- Markdown content -->
            <div
                v-if="item.markdown"
                v-html="micromark(item.markdown)"
                class="flow-200 prose measure"
            ></div>

            <!-- Image content -->
            <figure v-if="item.image"
                    class="learn__figure"
                    :class="[item.style ? 'learn__figure--' + item.style : null,
                            item.responsiveDisplay === 'mobile_only' ? 'lg:hidden' : item.responsiveDisplay === 'desktop_only' ? 'lg:block' : '' ]">
                <a v-if="item.url" :href="item.url">
                    <MediaBox
                        :image="item.image"
                        :sizes="'100vw'"
                        :lazy="true"
                        :ratio="true"
                        :rounded="true"
                        boxClass="media-box--ratio"/>
                </a>

                <MediaBox
                    v-else
                    :image="item.image"
                    :sizes="'100vw'"
                    :lazy="true"
                    :ratio="true"
                    :rounded="true"
                    boxClass="media-box--ratio"/>

                <figcaption class="mt-100 text-style-200" v-if="item.image.data.attributes.caption.length && item.image.data.attributes.caption !== item.image.data.attributes.name">
                    {{ item.image.data.attributes.caption }}
                </figcaption>
            </figure>

            <!-- Contact content -->
            <a
                v-if="item.mailto"
                class="btn btn--outline btn--xl | w-full lg:w-1/2"
                :href="'mailto:' + item.mailto">
                <span class="whitespace-pre-line text-center">
                    {{ item.label }}
                </span>
            </a>
        </template>
    </section>
</template>

<script setup>

    import { micromark } from 'micromark';
    import MediaBox from "../UI/MediaBox.vue";

    const root  = import.meta.env.PUBLIC_SERVER_URL;
    const props = defineProps(['content']);

</script>
