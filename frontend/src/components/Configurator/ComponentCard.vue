<template>
    <!-- // component heading -->
    <h2 class="p-box rounded-sm smoked-glass self-start">
        {{ component.attributes.name }}
    </h2>

    <!-- //  component types -->
    <div
        class="
            clear-glass
            rounded-sm
            uppercase
            text-style-200
            overflow-y-scroll overflow-x-hidden
        "
    >
        <ul class="building-components__head-row p-body sticky top-0">
            <li>Type</li>
            <li class="text-right">←</li>
            <li class="text-center">Cradle to site</li>
            <li class="text-center">Cradle to life</li>
            <li class="text-center">Cradle to cradle</li>
        </ul>
        <div
            class="
                building-components__card
                cluster cluster--stretched
                flex-col
            "
        >
            <ComponentCardItem
                v-for="element in component.attributes.elements.data"
                :key="element.id"
                :element="element"
                :component="component"
                :componentState="componentState"
                @update-selection="updateSelection"
            />
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import ComponentCardItem from "./ComponentCardItem.vue";

const componentState = ref(null);

const updateSelection = (val) => {
    console.log(val);
    componentState.value = val;
}

const props = defineProps(['building', 'component']);
</script>