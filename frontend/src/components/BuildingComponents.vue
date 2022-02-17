<template>
    <section class="building-components | flow-100" v-for="component in building.constructions.data[0].attributes.components.data[0]" :key="component">
        <!-- // component heading -->
        <h2 class="p-box rounded-sm smoked-glass self-start">{{ component.name }}</h2>

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
                <ComponentCardItem v-for="element in component.elements.data" :key="element" :element="element"/>
            </div>

        </div>

        <!-- back and forwards buttons -->
        <div class="building-components__buttons | cluster cluster--x-50 cluster--stretched">
            <button id="backwards" class="btn btn--md">←</button>
            <button id="forwards" class="btn btn--md">→</button>
        </div>

    </section>
</template>

<script>
import ComponentCardItem from './ComponentCardItem.vue';
export default {
    props: {
        building: Object,
    },
    components: {
        ComponentCardItem
    }
}
</script>