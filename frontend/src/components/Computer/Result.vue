<template>
    <section class="flow-200 measure">
        <h1 class="p-box rounded-sm smoked-glass self-start">
            Computation complete
        </h1>
        <div class="p-box rounded-md smoked-glass text-style-400 md:flex flex-row">

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

            <section class="flex mt-600 md:ml-600 md:mt-0">
                <ResultsGraphSession simpleRating/>
            </section>
        </div>
    </section>
</template>

<script setup>
import { ref, computed } from 'vue';
import { storedResult, storedSaving, storedStandard, savedCO2 } from '../../../store/constructions';

import ResultsGraphSession from './ResultsGraphSession.vue'

const calculated = storedResult.get();
const standard   = storedStandard.get();
const saving     = standard - calculated;

const forestValue = 10000;
const electricityValue = 475;
const berlinParisValue = 195;

const percentageCalculated = computed(() => {
    return Math.floor((100 * saving) / standard);
});

const forestCalculated = computed(() => {
    return Math.round((saving / forestValue) * 10) / 10;
});

const electricityCalculated = computed(() => {
    return Math.floor(saving / electricityValue);
});

const flightCalculated = computed(() => {
    return Math.floor(saving / berlinParisValue);
});

</script>