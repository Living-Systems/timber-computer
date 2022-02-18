<template>
    <nav class="subnav">

        <ol class="cluster cluster--stretched items-start">

            <!-- first loop: constructions -->
            <li v-for="construction in constructions" :key="construction.id">

                <ol class="cluster cluster--stretched items-start">

                    <!-- second loop: components -->
                    <li v-for="component in construction.attributes.components.data" :key="component">
                        <a href="#" class="subnav__item is-set">
                            <div class="subnav__item-title">
                                {{ component.attributes.name }}
                            </div>
                            <div class="subnav__group-title">
                                {{ construction.attributes.name }}
                            </div>
                        </a>
                    </li>

                </ol>

            </li>

        </ol>

    </nav>
</template>

<script setup>

import {ref} from 'vue';

const props = defineProps(['building']);

const constructions = ref(props.building.constructions.data);

</script>