<template>
    <section class="flow-200 measure">
        <h1 class="p-box rounded-sm smoked-glass self-start">
            Computation complete
        </h1>
        <div class="p-box rounded-md smoked-glass text-style-400 flex flex-row">

            <section class="flow flow-400">
                <!-- // todo: Text for default values or even lower values -->
                <!-- <p v-if="saving === 0"></p> -->

                <p>
                    Well done! Your design ranks above average and you are working towards a greener future. Your building uses {{ percentageCalculated }}% less carbon than a conventional building, which is equivalent to:
                </p>

                <ul>
                    <li>
                        the CO₂ intake of <u>{{ forestCalculated }} ha forest</u>, or
                    </li>
                    <li>
                        the annual household <u>electricity use × {{ electricityCalculated }}</u>, or
                    </li>
                    <li>
                        <u>{{ flightCalculated }} economy flights</u> (Berlin–Paris)
                    </li>
                </ul>
            </section>

            <section class="flex">
                <ResultsGraph simpleRating/>
            </section>
        </div>
    </section>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useStore } from "@nanostores/vue";
import { standardC02, savedCO2, rating } from "../../../store/constructions";

import ResultsGraph from './ResultsGraph.vue'

const computedRating = useStore(rating);
const standard = useStore(standardC02);
const saving = useStore(savedCO2);

const forestValue = 10000;
const electricityValue = 475;
const berlinParisValue = 195;

const percentageCalculated = computed(() => {
    console.log('');
    return Math.floor((100 * saving.value) / standard.value);
});

const forestCalculated = computed(() => {
    console.log('forestCalculated', saving, forestValue);
    return saving / forestValue;
});

const electricityCalculated = computed(() => {
    return saving / electricityValue;
});

const flightCalculated = computed(() => {
    return saving / berlinParisValue;
});

</script>