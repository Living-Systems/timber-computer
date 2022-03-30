<template>
    <!-- Component Heading -->
    <h2 class="computer-component__title | p-box rounded-sm smoked-glass">
        {{ component.attributes.name }}
    </h2>

    <!-- Component Types -->
    <div
        class="computer-component__content | md:clear-glass rounded-sm uppercase text-style-200"
        :class="isCollapsed ? 'is-collapsed' : null"
    >
        <div class="computer-component__table-header">
            <div class="computer-component__table-title | p-item">
                <p aria-hidden="true">Type</p>
                <button class="btn | cluster cluster--x-50 "
                        @click="toggleDetailsCollapsed">
                    <span class="uppercase" v-show="isCollapsed">Details</span>
                    <span>{{ isCollapsed ? '→' : '←' }}</span>
                </button>
            </div>

            <div class="computer-component__table-info | flow-50 p-item text-center" aria-hidden="true">
                <ul class="flex | border-b pb-50">
                    <li class="flex-1 px-100">Cradle to site</li>
                    <li class="flex-1 px-100">Cradle to life</li>
                    <li class="flex-1 px-100">Cradle to cradle</li>
                    <li class="flex-1 px-100">Renewable Material</li>
                </ul>
                <div class="cluster cluster--stretched">
                    <div></div>
                    <div>
                        (all in kg CO₂e/m²)
                    </div>
                    <div></div>
                    <div>
                        (% of Mass)
                    </div>
                </div>
            </div>
        </div>

        <!-- Elements -->
        <div class="computer-component__table-body">
            <ComputerComponentItem
                v-for="element in component.attributes.elements.data"
                :key="element.id"
                :element="element"
                :component="component"
                :active="loadedActive(element)"
                :componentState="componentState"
                @update-selection="updateSelection"
            />
        </div>
    </div>
</template>

<script setup>

import { ref, onMounted, getCurrentInstance } from 'vue';
import { useStore } from "@nanostores/vue";
import { detailsCollapsed, toggleDetailsCollapsed, storedSelection, selectedConstructions } from "../../../store/constructions";

import ComputerComponentItem from "./ComputerComponentItem.vue";

const props = defineProps(['building', 'component']);

const isCollapsed = useStore(detailsCollapsed);

const loadedComponent = ref(null);
const componentState = ref(null);

const storedSel = useStore(selectedConstructions);

const updateSelection = (val) => {
    componentState.value = val;
};

const loadedActive = element => {
    for (const construction of storedSel.value) {
        for (const component of construction.attributes.components.data){
            if(element.attributes.name == component.attributes.element.data.attributes.name){
                return true;
            }
        }
    }
};

</script>