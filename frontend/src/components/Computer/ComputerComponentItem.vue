<template>
    <label class="computer-component__item | clear-glass md:no-glass rounded-sm">

        <!-- Input control -->
        <input
            type="radio"
            :name="component.attributes.name"
            :id="element.id"
            @change="updateSelection(component.id, element)"
            :checked="active"
        />

        <!-- Element type -->
        <div class="computer-component__item-content">
            <div class="computer-component__item-head | flow-25 p-item">
                <MediaBox
                    v-if="element.attributes.thumbnail.data"
                    :image="element.attributes.thumbnail"
                    :sizes="'(min-width: 64em) 20vw, (min-width: 37.5em) 28vw, 35vw'"
                    :lazy="true"
                    class="media-box--contain"/>
                <div v-else class="media-box media-box--contain">
                    <img src="../../../public/assets/dummy-component.png"
                         alt="" />
                </div>
                <div class="computer-component__item-title | text-center">
                    <span :class="'badge badge--' + [sustainabilityClass]"></span>
                    <span class="truncate">{{ element.attributes.frontendName }}</span>
                </div>
            </div>

            <!-- Element values -->
            <div class="computer-component__item-info | cluster cluster--stretched | text-center" aria-hidden="true">
                <dl>
                    <dt class="sr-only">Cradle to Site</dt>
                    <dd>{{ element.attributes.cradleToSite }}</dd>
                </dl>
                <dl>
                    <dt class="sr-only">Cradle to Life</dt>
                    <dd>{{ element.attributes.cradleToLife }}</dd>
                </dl>
                <dl>
                    <dt class="sr-only">Cradle to Cradle</dt>
                    <dd>{{ element.attributes.cradleToCradle }}</dd>
                </dl>
                <dl>
                    <dt class="sr-only">Renewable Material</dt>
                    <dd>{{ element.attributes.renewableMaterial }}</dd>
                </dl>
            </div>
        </div>
    </label>
</template>

<script setup>

import { ref, computed } from 'vue';
import { useStore } from "@nanostores/vue";
import { activeComponentId, updateSelection } from "../../../store/constructions";

import MediaBox from "../UI/MediaBox.vue";

const root  = import.meta.env.PUBLIC_SERVER_URL;

const props = defineProps(['component', 'element', 'componentState', 'active']);

defineEmits(['updateSelection']);

const sustainabilityClass = computed(()=>{
    return props.element.attributes.sustainability;
});

const activeComponent = computed(() => {
    return useStore(activeComponentId);
});

</script>
