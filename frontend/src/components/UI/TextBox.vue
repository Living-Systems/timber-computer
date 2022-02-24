<template>
    <section class="flow-200">
        <h1 class="p-box rounded-sm smoked-glass self-start">
            {{ heading }}
        </h1>
        <div class="p-box rounded-md smoked-glass text-style-600">
            <p v-if="content">{{ content }}</p>
            <p v-for="value of compareBuilding" :key="value">
                {{ standardBuilding / value.value }}
            </p>
        </div>
    </section>
</template>

<script setup>
import {ref} from 'vue';
import { useStore } from "@nanostores/vue";
import { standardC02, compareValues } from "../../../store/constructions";

const props = defineProps(['heading', 'content', 'result']);
const heading = ref(props.heading);
const content = ref(props.content);

const standardBuilding = useStore(standardC02);
const compareBuilding = useStore(compareValues);

</script>