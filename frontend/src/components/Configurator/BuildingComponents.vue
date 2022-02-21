<template>
    <section class="building-components configurator-wrapper | flow-100">
        <!-- Tragwerk -->
        <div
            v-for="component in allComponents"
            :key="component.id"
            class="flow-100"
        >
            <ComponentCard :building="building" :component="component"/>
        </div>

            <!-- back and forwards buttons -->
        <div class="building-components__buttons | cluster cluster--x-50 cluster--stretched">
            <button id="backwards" class="btn btn--md">←</button>
            <button id="forwards" class="btn btn--md">→</button>
        </div>
    </section>
</template>

<script setup>
import ComponentCard from "./ComponentCard.vue";

const props = defineProps(["building"]);

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