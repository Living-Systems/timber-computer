<template>
    <div class="results-graph | text-style-200"
             :class="!simpleRating ? 'results-graph--fixed p-body smoked-glass rounded-sm' : ''">
        <div class="flow-200">
            <div v-if="!simpleRating" class="uppercase">
                Preliminary Result
            </div>
            <ul class="results-graph__rating | flow-50">
                <li v-for="rating in ratings"
                    class="results-graph__rating-item"
                    :aria-hidden="rating != computedRating">
                    <span>
                        {{ rating }}
                    </span>
                    <template v-if="rating === computedRating">
                        ←
                    </template>
                </li>
            </ul>

            <p class="text-center text-style-100">{{ kgTonCalculator(computedCalculation) }}</p>
        </div>
    </div>
</template>

<script setup>

const props = defineProps({simpleRating: Boolean});

const computedCalculation = sessionStorage.getItem('calculatedCO2');
const computedRating = sessionStorage.getItem('rating');

const ratings = ['A','B','C','D','E','F'];

const kgTonCalculator = (kgValue) => {
    return (kgValue / 1000).toFixed(1) + 't CO₂';
}
</script>