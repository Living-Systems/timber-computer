<template>
    <nav class="subnav | text-style-200 uppercase">

        <ol class="cluster cluster--stretched items-start">

            <li v-for="step in learnSteps" :key="step.id">
                <a href="/" class="subnav__item is-set">
                    <div class="subnav__group-title">
                        {{ step.title }}
                    </div>
                </a>
            </li>

        </ol>

    </nav>
</template>

// <script setup>

import {reactive} from 'vue';

const learnSteps = reactive({
    step1: {
        id: 'step1',
        title: 'Background',

    },
    step2: {
        id: 'step2',
        title: 'Clean building',

    },
    step3: {
        id: 'step3',
        title: 'Lifecycle Assessment',

    },
    step4: {
        id: 'step4',
        title: 'Application',

    },
    step5: {
        id: 'step5',
        title: 'Scaling',

    }
});

</script>