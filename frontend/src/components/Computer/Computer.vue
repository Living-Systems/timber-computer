<template>
    <section class="configurator | flow-100">
        <div class="configurator__components flex">
            <!-- Konstruktion -->
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
            class="configurator__nav | cluster cluster--x-50 cluster--stretched"
        >
            <button class="btn btn--md" @click="changeActive('decrement')">
                <span class="sr-only">previous</span>
                <span aria-hidden="true">←</span>
            </button>
            <button class="btn btn--md" @click="changeActive('increment')">
                <span class="sr-only">next</span>
                <span aria-hidden="true">→</span>
            </button>
        </nav>
    </section>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "@nanostores/vue";
import { activeComponentId, changeActive } from "../../../store/constructions";

import ComputerComponent from "./ComputerComponent.vue";

const props = defineProps(["building"]);

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
