<template>
    <section class="computer | flow-grid mb-800 md:mb-900">
        <div class="computer__components">

            <!-- Construction -->
            <div
                v-for="component in allComponents"
                :key="component.id"
                class="computer-component | flow-grid"
                :class="
                    component.id == activeComponent.value ? 'is-active' :
                    component.id == activeComponent.value + 1 ? 'is-next' :
                    component.id == activeComponent.value - 1 ? 'is-previous' : null
                "
                :aria-hidden="component.id != activeComponent.value"
                :style="'--animation-offset: ' + offset"
            >
                <ComputerComponent :building="building" :component="component" />
            </div>
        </div>

        <!-- Back and Forwards buttons -->
        <nav
            class="computer__nav | cluster cluster--x-50 cluster--stretched"
        >
            <button
                class="btn btn--md btn--smoked"
                @click="changeActive('decrement')"
                v-if="activeComponent.value != 1"
            >
                <span class="sr-only">previous</span>
                <span aria-hidden="true">←</span>
            </button>

            <a
                class="btn btn--md btn--smoked"
                href="/compute"
                v-if="activeComponent.value === 1"
            >
                <span class="sr-only">previous</span>
                <span aria-hidden="true">←</span>
            </a>

            <button
                v-if="activeComponent.value < numberOfComponents"
                class="btn btn--md btn--smoked"
                @click="changeActive('increment')"
            >
                <span class="sr-only">next</span>
                <span aria-hidden="true">→</span>
            </button>

            <a
                v-else
                href="/result"
                class="btn btn--md btn--smoked uppercase"
            >
                See Results
            </a>
        </nav>
    </section>

    <!-- Display component image and preload next one upcoming -->
    <template
        v-for="component in allComponents"
        :key="component.id">
        <MediaBox
            v-if="component.id == activeComponent.value || component.id == activeComponent.value + 1"
            :image="component.attributes.backgroundImage"
            class="media-box--computer"
            :class="component.id != activeComponent.value ? 'hidden' : ''"
            :img-class="component.id != activeComponent.value ? '' : 'animate-zoom'"/>
    </template>

    <div class="computer__mesh"></div>

</template>

<script setup>

import { computed } from "vue";
import { useStore } from "@nanostores/vue";

import { activeComponentId, componentCounter, changeActive, savedCO2, standardC02, storedSelection, setOffset } from "../../../store/constructions";

import ComputerComponent from "./ComputerComponent.vue";
import MediaBox from "../UI/MediaBox.vue";

const props = defineProps(["building"]);

const numberOfComponents = useStore(componentCounter);
const savedCO22 = useStore(savedCO2);
const standardC022 = useStore(standardC02);
const offset = useStore(setOffset);

const activeComponent = computed(() => {
    return useStore(activeComponentId);
});

let allComponents = [];


for (const construction of props.building.constructions.data) {
    for (const component of construction.attributes.components.data) {
        allComponents.push({
            construction: construction.id,
            ...component,
        });
    }
}

</script>
