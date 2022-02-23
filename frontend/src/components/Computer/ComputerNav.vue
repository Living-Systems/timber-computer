<template>
    <nav class="subnav">

        <ol class="cluster items-start" :style="'--total-items: ' + numberOfComponents">

            <!-- first loop: constructions -->
            <li
                class="subnav__construction"
                v-for="construction in enhancedConstructions"
                :style="'--group-items: ' + construction.counter"
                :key="construction.id"
            >
                <div class="subnav__construction-title">
                    {{ construction.name }}
                </div>
                <ol class="cluster cluster--stretched items-start">

                    <!-- second loop: components -->
                    <li
                        v-for="component in construction.components"
                        :key="component"
                        @click="changeActive(component.id)"
                    >
                        <button
                            class="subnav__item | btn uppercase"
                            :class="
                                !inactive && activeComponent == component.id ? 'is-current'
                                : !inactive && activeComponent > component.id ? 'is-set'
                                : null
                            "
                        >
                            <div class="subnav__item-title">
                                {{ component.attributes.name }}
                            </div>
                        </button>
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

const props = defineProps(['building', 'inactive']);

const activeComponent = useStore(activeComponentId);
const numberOfComponents = useStore(componentCounter);


// * Calculation for Styling
// numberOfComponents / enhancedConstructions.counter to calculate width

const constructions = ref(props.building.constructions.data);

let enhancedConstructions = [];

for (const construction of constructions.value) {
    enhancedConstructions.push({
        name: construction.attributes.name,
        id: construction.id,
        counter: 1,
        components: []
    })
    for (const component of construction.attributes.components.data) {
        const foundConstruction = enhancedConstructions.find(element => element.id == construction.id);

        foundConstruction.counter += 1;
        foundConstruction.components.push({...component});
    }
}
</script>