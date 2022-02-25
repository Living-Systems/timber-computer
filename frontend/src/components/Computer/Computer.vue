<template>
    <section class="computer | flow-100 mb-900">
        <div class="computer__components flex">
            <!-- Construction -->
            <div
                v-for="component in allComponents"
                :key="component.id"
                class="computer-component | flow-100"
                :class="
                    component.id == activeComponent.value ? 'is-active' : null
                "
                :aria-hidden="component.id != activeComponent.value"
            >
                <ComputerComponent :building="building" :component="component" />
            </div>
        </div>

        <!-- back and forwards buttons -->
        <nav
            class="computer__nav | cluster cluster--x-50 cluster--stretched"
        >
            <button
                class="btn btn--md"
                @click="changeActive('decrement')"
                v-if="activeComponent.value != 1"
            >
                <span class="sr-only">previous</span>
                <span aria-hidden="true">←</span>
            </button>

            <button
                v-if="activeComponent.value < numberOfComponents"
                class="btn btn--md"
                @click="changeActive('increment')"
            >
                <span class="sr-only">next</span>
                <span aria-hidden="true">→</span>
            </button>

            <a
                v-else
                href="/result"
                class="btn btn--md uppercase"
            >
                See Results
            </a>
        </nav>
    </section>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "@nanostores/vue";
import { activeComponentId, componentCounter, changeActive } from "../../../store/constructions";

import ComputerComponent from "./ComputerComponent.vue";

const props = defineProps(["building"]);

const numberOfComponents = useStore(componentCounter);

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
