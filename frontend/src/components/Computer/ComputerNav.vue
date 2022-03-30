<template>
    <nav class="subnav subnav--computer">

        <ol class="cluster items-start" :style="'--total-items: ' + (numberOfComponents + 1) ">

            <!-- First loop: Constructions -->
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

                    <!-- Second loop: Components -->
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

            <!-- Results link -->
            <li class="subnav__result kajsd" :data-rating="computedRating">
                <a href="/result" class="subnav__item subnav__item--result | btn uppercase">
                    <span class="subnav__result-title">
                        Result
                    </span>
                </a>
            </li>
        </ol>

    </nav>
</template>

<script setup>

import {computed, ref} from "vue";
import { useStore } from "@nanostores/vue";
import { activeComponentId, rating, changeActive, componentCounter, storedRating } from "../../../store/constructions";

const props = defineProps(['building', 'inactive']);

const activeComponent = useStore(activeComponentId);
const numberOfComponents = useStore(componentCounter);

const constructions = ref(props.building.constructions.data);

// ↓ Calculation for Styling ↓
// numberOfComponents / enhancedConstructions.counter to calculate width

let enhancedConstructions = [];

for (const construction of constructions.value) {
    enhancedConstructions.push({
        name: construction.attributes.name,
        id: construction.id,
        counter: 0,
        components: []
    })
    for (const component of construction.attributes.components.data) {
        const foundConstruction = enhancedConstructions.find(element => element.id == construction.id);

        foundConstruction.counter += 1;
        foundConstruction.components.push({...component});
    }
}

const computedRating = computed(()=>{
    return useStore(rating).value;
});

</script>