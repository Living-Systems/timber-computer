<template>
    <div class="results-graph | text-style-200"
             :class="!simpleRating ? 'results-graph--computer p-body smoked-glass rounded-sm' : ''">
        <div class="flow-100">
            <div v-if="!simpleRating" class="uppercase hidden md:block">
                Result
            </div>

            <div class="results-graph__graph" :data-rating="computedRating">
                <div class="results-graph__graph-ring"></div>
                <div class="results-graph__graph-result | text-center">
                    <p class="text-style-600">
                        {{ computedRating }}
                    </p>
                    <p class="text-style-100 mb-100">
                        {{ kgTonCalculator(computedCalculation) }}
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';

import { useStore } from "@nanostores/vue";
import { calculatedCO2, rating, storedResult, storedRating, kgTonCalculator } from "../../../store/constructions";

// const ratings = ['A','B','C','D','E','F'];

// const kgTonCalculator = (kgValue) => {
//     return (kgValue / 1000).toFixed(1) + 't CO₂';
// };

const props = defineProps({
    simpleRating: Boolean,
    computer: Boolean,
    result: Boolean
});

let params;
if(props.result) {
    params = new URLSearchParams(document.location.search);
}

const computedCalculation = computed(()=>{
    if(props.computer){
        return useStore(calculatedCO2).value;
    } else if(props.result){
        if (params.has('ids')) {
            return useStore(calculatedCO2).value;
        }
        return storedResult.get();
    }
});

const computedRating = computed(()=>{
    if(props.computer){
        return useStore(rating).value;
    } else if(props.result){
        if (params.has('ids')) {
            return useStore(rating).value;
        }
        return storedRating.get();
    }
});

</script>