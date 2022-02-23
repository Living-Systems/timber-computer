<template>
    <label class="computer-component__label">
        <input
            type="radio"
            :name="component.attributes.name"
            :id="element.id"
            @change="updateSelection(component.id, element)"
            :checked="props.component.attributes.element.data.id === element.id"
        />
        <div class="computer-component__comp-row">
            <div class="relative pb-300">
                <img src="../../../public/assets/dummy-component.png" alt="" />
                <p class="whitespace-nowrap absolute bottom-0 left-0">
                    {{ element.attributes.frontendName }}
                </p>
            </div>
            <!-- <p class="border-2 border-solid rounded-full border-current">A+</p> -->
            <p :class="sustainabilityClass">{{ element.attributes.sustainability }}</p>
            <p>{{ element.attributes.cradleToSite }}</p>
            <p>{{ element.attributes.cradleToLife }}</p>
            <p>{{ element.attributes.cradleToCradle }}</p>
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
