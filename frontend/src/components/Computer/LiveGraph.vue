<template>
    <section class="live-graph p-body smoked-glass rounded-sm text-style-200">
        <div class="flow flow-200">
            <p class="uppercase">Zwischenstand</p>
            <img src="../../../public/assets/dummy-graph.png" alt="">
            <p class="text-center text-style-400">{{ computedCalculation }}</p>
            <p class="text-center text-style-400">{{ computedRating }}</p>
        </div>
    </section>
</template>

<script setup>
import { useStore } from "@nanostores/vue";
import { calculation, rating } from "../../../store/constructions";

const computedCalculation = useStore(calculation);
const computedRating = useStore(rating);
</script>