<template>
    <section class="building-components configurator-wrapper | flow-100">

        <!-- Tragwerk -->
        <div v-for="component in allComponents" :key="component.id" class="flow-100">
            <!-- // component heading -->
            <h2 class="p-box rounded-sm smoked-glass self-start">{{ component.attributes.name }}</h2>

            <!-- //  component types -->
            <div class="clear-glass rounded-sm uppercase text-style-200 overflow-y-scroll overflow-x-hidden">
            
                <ul class="building-components__head-row p-body sticky top-0">
                    <li>Type</li>
                    <li class="text-right">←</li>
                    <li class="text-center">Cradle to site</li>
                    <li class="text-center">Cradle to life</li>
                    <li class="text-center">Cradle to cradle</li>
                </ul>
                <div class="building-components__card cluster cluster--stretched flex-col">
                    <ComponentCardItem v-for="element in component.attributes.elements.data" :key="element.id" :element="element"/>
                </div>
            </div>
            <!-- back and forwards buttons -->
        </div>

        <div class="building-components__buttons | cluster cluster--x-50 cluster--stretched">
            <button id="backwards" class="btn btn--md">←</button>
            <button id="forwards" class="btn btn--md">→</button>
        </div>

    </section>
</template>

<script setup>
import ComponentCardItem from './ComponentCardItem.vue';

const props = defineProps(['building']);

let allComponents = [];

for (const construction of props.building.constructions.data){
    for(const component of construction.attributes.components.data){
        allComponents.push({
            construction: construction.id,
            ...component
        })
    }
};


console.log(props.building.constructions.data[0].attributes.components.data[0]);
</script>