<template>
    <section class="flow-200">
        <h1 class="p-box rounded-sm smoked-glass self-start">
            {{ props.heading }}
        </h1>
        <div class="p-box rounded-md smoked-glass text-style-600">
            <p v-if="props.content">{{ props.content }}</p>
            <p v-if="result">
                {{ kgTonCalculator(saving) }} gespart
            </p>
            <p v-if="result" v-for="value of compare" :key="value">
                {{ saving / value.value }} {{ value.description }}
            </p>
        </div>
    </section>
</template>

<script setup>
import {ref} from 'vue';
import { useStore } from "@nanostores/vue";
import { savedCO2, compareValues, kgTonCalculator } from "../../../store/constructions";

const props = defineProps(['heading', 'content', 'result']);
const result = ref(props.result);

const saving = useStore(savedCO2);
const compare = useStore(compareValues);

</script>