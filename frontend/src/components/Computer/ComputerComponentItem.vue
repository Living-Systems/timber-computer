<template>
    <label class="computer-component__item">
        <input
            type="radio"
            :name="component.attributes.name"
            :id="element.id"
            @change="updateSelection(component.id, element)"
            :checked="props.component.attributes.element.data.id === element.id"
        />

        <div class="computer-component__item-content | flex p-item">
            <div class="computer-component__item-head | cluster cluster--y-gap cluster--y-300">
                <p class="w-full order-last">
                    {{ element.attributes.frontendName }}
                </p>
                <img src="../../../public/assets/dummy-component.png" alt="" />
                <i :class="sustainabilityClass">{{ element.attributes.sustainability }}</i>
            </div>

            <div class="computer-component__item-info | cluster cluster--stretched grow text-center" aria-hidden="true">
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
