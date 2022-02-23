<template>
    <nav class="subnav">

        <ol class="cluster items-start" :style="'--total-items: ' + numberOfComponents">

            <!-- first loop: constructions -->
            <li
                class="subnav__construction-item"
                :style="'--group-items: ' + construction.counter"
                v-for="construction in enhancedConstructions"
                :key="construction.id"
            >
                <ol class="cluster cluster--stretched items-start">

                    <!-- second loop: components -->
                    <li
                        v-for="component in construction.components"
                        :key="component"
                        @click="changeActive(component.id)"
                    >
                        <div
                            class="subnav__item"
                            :class="
                                !inactive && activeComponent == component.id ? 'is-current'
                                : !inactive && activeComponent > component.id ? 'is-set'
                                : null
                            "
                        >
                            <div class="subnav__item-title">
                                {{ component.attributes.name }}
                            </div>
                            <div class="subnav__group-title">
                                {{ construction.name }}
                            </div>
                        </div>
                    </li>

                </ol>

            </li>

        </ol>

    </nav>
</template>

<script setup>
import { ref } from "vue";
import { useStore } from "@nanostores/vue";
import { activeComponentId, changeActive, componentCounter } from "../../../store/constructions";

const props = defineProps({
    building: String,
    inactive: Boolean
});

const activeComponent = useStore(activeComponentId);
const numberOfComponents = useStore(componentCounter);


// * Calculation for Styling
// numberOfComponents / enhancedConstructions.counter to calculate width

const constructions = ref(props.building.constructions.data);

let enhancedConstructions = [];

for (const construction of constructions.value) {
    for (const component of construction.attributes.components.data) {

        let found = enhancedConstructions.find((element) => {
            return element.construction === construction.attributes.name;
        });

        if (!found) {
            enhancedConstructions.push({
                name: construction.attributes.name,
                counter: 1,
                components: [component],
            });
        }
    }
}
</script>