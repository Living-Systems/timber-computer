<template>
    <section class="flow-200 measure">
        <h1 class="p-box rounded-sm smoked-glass self-start">
            Computation complete
        </h1>
        <div class="p-box rounded-md smoked-glass text-style-400 flex flex-col md:flex-row">

            <!-- Result text -->
            <section class="flow flow-400">
                <p v-if="saving <= 0">
                    Unfortunately, your design is just average and you are not working towards a greener future.
                </p>

                <p v-if="saving > 0">
                    Well done! Your design ranks above average and you are working towards a greener future. Your building uses <u>{{ percentageCalculated }}% less</u> carbon than a conventional building, which is equivalent to:
                </p>

                <ul v-if="saving > 0">
                    <li>
                        • the CO₂ intake of <u>{{ forestCalculated }} ha forest</u>, or
                    </li>
                    <li>
                        • the annual household <u>electricity use × {{ electricityCalculated }}</u>, or
                    </li>
                    <li>
                        • <u>{{ flightCalculated }} economy flights</u> (Berlin–Paris)
                    </li>
                </ul>
            </section>

            <!-- Result graph -->
            <section class="flex mt-600 md:ml-600 md:mt-0 self-center">
                <ResultsGraph simpleRating result/>
            </section>
        </div>

        <div class="p-box rounded-md smoked-glass">
            <ResultReport />
        </div>
    </section>
</template>

<script setup>

import { computed } from 'vue';
import { useStore } from "@nanostores/vue";
import { storedResult, storedStandard, setSelectedConstructionsByIds, calculateSavings, calculatePercentage, calculateForest, calculateElectricity, calculateFlight, forestValue, electricityValue, berlinParisValue } from '../../../store/constructions';

import ResultsGraph from './ResultsGraph.vue'
import ResultReport from './ResultReport.vue'

const params = new URLSearchParams(document.location.search);

if (params.has('ids')) {
    const ids = params.get('ids')
    setSelectedConstructionsByIds(ids)
}

let saving;
if (params.has('ids')) {
    saving = computed(() => {
        return useStore(calculateSavings).value;
    }) 
} 
else {
    saving = storedStandard.get() - storedResult.get();
};
 

const percentageCalculated = computed(() => {
    if(params.has('ids')) {
        return useStore(calculatePercentage).value;
    } else {
        return Math.floor((100 * saving) / storedStandard.get());
    }
});

const forestCalculated = computed(() => {
    if(params.has('ids')) {
        return useStore(calculateForest).value;
    } else {
        return Math.round((saving / forestValue) * 10) / 10;
    }
});

const electricityCalculated = computed(() => {
    if(params.has('ids')) {
        return useStore(calculateElectricity).value;
    } else {
        return Math.floor(saving / electricityValue);
    }
});

const flightCalculated = computed(() => {
    if(params.has('ids')) {
        return useStore(calculateFlight).value;
    } else {
        return Math.floor(saving) / berlinParisValue;
    }
});

</script>