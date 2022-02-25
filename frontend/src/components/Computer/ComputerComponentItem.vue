<template>
    <label class="computer-component__item">
        <input
            type="radio"
            :name="component.attributes.name"
            :id="element.id"
            @change="updateSelection(component.id, element)"
            :checked="props.component.attributes.element.data.id === element.id"
        />

        <div class="computer-component__item-content">
            <div class="computer-component__item-head | flow-300 p-item">
                <div class="media-box media-box--contain">
                    <img src="../../../public/assets/dummy-component.png"
                         class="object-contain"
                         alt="" />
                </div>
                <div class="text-center truncate">
                    <span :class="'badge badge--' + [sustainabilityClass]"><!--{{ element.attributes.sustainability }}--></span>
                    {{ element.attributes.frontendName }}
                </div>
            </div>

            <div class="computer-component__item-info | cluster cluster--stretched text-center" aria-hidden="true">
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
                    <!-- // todo: change to value from databank -->
                    <dd>{{ element.attributes.renewableMaterial }}</dd>
                </dl>
            </div>
        </div>
    </label>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from "@nanostores/vue";
import { updateSelection } from "../../../store/constructions";

const props = defineProps(['component', 'element', 'componentState']);

defineEmits(['updateSelection']);

const sustainabilityClass = computed(()=>{
    return props.element.attributes.sustainability;
})

// @change="$emit('updateSelection', element)"
</script>
