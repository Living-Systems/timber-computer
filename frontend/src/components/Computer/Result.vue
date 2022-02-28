<template>
    <section class="flow-200 measure">
        <h1 class="p-box rounded-sm smoked-glass self-start">
            Computation complete
        </h1>
        <div class="p-box rounded-md smoked-glass text-style-400 flex flex-row">

            <section class="flow flow-400">
                <!-- // todo: Text for default values or even lower values -->
                <!-- <p v-if="saving === 0"></p> -->

                <p v-if="saving <= 0">
                    Unfortunately, your design is just average and you are not working towards a greener future.
                </p>

                <p v-if="saving > 0">
                    Well done! Your design ranks above average and you are working towards a greener future. Your building uses {{ percentageCalculated }}% less carbon than a conventional building, which is equivalent to:
                </p>

                <ul v-if="saving > 0">
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

            <section class="flex ml-600">
                <ResultsGraphSession simpleRating/>
            </section>
        </div>
    </section>
</template>

<script setup>
import { ref, computed } from 'vue';

import ResultsGraphSession from './ResultsGraphSession.vue'

const calculated = sessionStorage.getItem('calculatedCO2');
const standard = sessionStorage.getItem('standardC02');

const saving = standard - calculated;

console.log('calculated', calculated);
console.log('standard', standard);
console.log('saving', saving);

const forestValue = 10000;
const electricityValue = 475;
const berlinParisValue = 195;

const percentageCalculated = computed(() => {
    return Math.floor((100 * saving.value) / standard.value);
});

const forestCalculated = computed(() => {
    return saving / forestValue;
});

const electricityCalculated = computed(() => {
    return saving / electricityValue;
});

const flightCalculated = computed(() => {
    return saving / berlinParisValue;
});

</script>