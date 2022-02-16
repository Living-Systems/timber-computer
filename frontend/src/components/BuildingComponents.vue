<template>
    <section class="building-components flow-100">
        <!-- // component heading -->
        <h3 class="smoke-box--sm p-body w-fit">Ceiling</h3>

        <!-- //  component types -->
        <div class="clear-box--sm uppercase text-style-200 overflow-y-scroll overflow-x-hidden">
            <ul class="building-components__row p-body sticky top-0">
                <li>Type</li>
                <li class="text-right">←</li>
                <li class="text-center">Cradle to site</li>
                <li class="text-center">Cradle to life</li>
                <li class="text-center">Cradle to cradle</li>
            </ul>
            
            <div class="building-components__card cluster cluster--stretched flex-col">
                <ComponentCardItem/>
                <ComponentCardItem/>
                <ComponentCardItem/>
            </div>

        </div>

        <!-- back and forwards buttons -->
        <div class="building-components__buttons | cluster cluster--stretched">
            <div id="backwards" class="sml-btn">←</div>
            <div id="forwards" class="sml-btn">→</div>
        </div>
    </section>
</template>

<script>
import ComponentCardItem from './ComponentCardItem.vue';
export default {
    components: {
        ComponentCardItem
    }
}
</script>