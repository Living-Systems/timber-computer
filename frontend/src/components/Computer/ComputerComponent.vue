<template>
    <!-- // component heading -->
    <h2 class="computer-component__title | p-box rounded-sm smoked-glass self-start">
        {{ component.attributes.name }}
    </h2>

    <!-- //  component types -->
    <div class="computer-component__content | clear-glass rounded-sm uppercase text-style-200 overflow-y-auto">
        <div class="computer-component__table-header">
            <div class="computer-component__table-title | p-item">
                <p aria-hidden="true">Type</p>
                <button class="btn"> <!-- Todo: add expand interaction -->
                    <span>←</span>
                </button>
            </div>

            <div class="computer-component__table-info | flow-50 p-item text-center" aria-hidden="true">
                <ul class="cluster cluster--stretched | border-b pb-50">
                    <li>Cradle to site</li>
                    <li>Cradle to life</li>
                    <li>Cradle to cradle</li>
                </ul>
                <div>
                    (all in kg CO₂e/m²)
                </div>
            </div>
        </div>
        
        <div class="computer-component__table-body | flex flex-col">
            <ComputerComponentItem
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
import ComputerComponentItem from "./ComputerComponentItem.vue";

const props = defineProps(['building', 'component']);

const componentState = ref(null);

const updateSelection = (val) => {
    console.log(val);
    componentState.value = val;
};
</script>