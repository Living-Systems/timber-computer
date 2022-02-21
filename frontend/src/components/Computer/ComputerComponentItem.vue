<template>
    <label class="building-components__label">
        <input
            type="radio"
            :name="component.attributes.name"
            :id="element.id"
            @change="$emit('updateSelection', element)"
        />
        <div class="building-components__comp-row | p-body">
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

const props = defineProps(['component', 'element', 'componentState']);

defineEmits(['updateSelection']);

const sustainabilityClass = computed(()=>{
    return props.element.attributes.sustainability;
})

</script>