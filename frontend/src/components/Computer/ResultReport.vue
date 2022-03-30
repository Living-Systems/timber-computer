<template>
    <details class="result-details" open>
        <summary class="result-detail__header | p">Your Building Setup</summary>
        <div class="result-detail__table | uppercase text-style-200 mt-200">
            <div class="result-detail__table-header | py-item border-b">
                <div class="cluster">
                    <div class="w-1/3">Component</div>
                    <div class="w-1/3">Chosen Layout</div>
                    <div class="w-1/3 text-right">
                        CO₂ emissions
                        <span class="w-1/3 truncate">cradle to life</span>
                    </div>
                </div>
            </div>

            <!-- First Loop: Components -->
            <ol class="result-detail__table-body | lg:text-style-400 lg:normal-case"
                v-for="component in selection"
                :key="component.id"
            >
                <!-- Second Loop: Elements -->
                <li class="result-detail__table-item | py-item border-b"
                    v-for="element in component.attributes.components.data"
                    :key="element.id"
                >
                    <div class="cluster">

                        <!-- Component -->
                        <div class="w-1/3 capitalize">
                            {{ element.attributes.name }}
                            <span class="opacity-60 block">({{ element.attributes.area }}m²)</span>
                        </div>

                        <!-- Chosen Layout -->
                        <div class="w-1/3 truncate capitalize">
                            <span :class="'badge badge--' + element.attributes.element.data.attributes.sustainability"></span>
                            {{ element.attributes.element.data.attributes.frontendName }}
                        </div>

                        <!-- CO₂ Emissions Cradle To Life -->
                        <div class="w-1/3 text-right">
                            {{ kgTonCalculator(element.attributes.area * element.attributes.element.data.attributes.cradleToLife) }}
                            <span class="truncate opacity-60 block">({{ Math.round(element.attributes.element.data.attributes.cradleToLife * 10) / 10 }}kg/m²)</span>
                        </div>

                    </div>
                </li>
            </ol>

            <!-- CO₂ Emissions Total -->
            <ol class="result-detail__table-body | lg:text-style-400 lg:normal-case">
                <li class="result-detail__table-item | py-item text-right">
                    {{ kgTonCalculator(result) }}
                </li>
            </ol>
        </div>
        </details>
</template>

<script setup>

import { computed } from 'vue';
import { useStore } from "@nanostores/vue";
import { storedSelection, storedResult, kgTonCalculator, setSelectedConstructionsByIds, calculatedCO2, selectedConstructions } from '../../../store/constructions';
const params = new URLSearchParams(document.location.search);

if (params.has('ids')) {
    const ids = params.get('ids')
    setSelectedConstructionsByIds(ids)
}

const selection = computed(() => {
    if (params.has('ids')) {
        return useStore(selectedConstructions).value;
    }
    return storedSelection.get();
});
const result = computed(() => { 
    if (params.has('ids')) {
        return useStore(calculatedCO2).value;
    }
    return storedResult.get();
});

console.log('selection', selection);

const capitalizeFirstLetter=(string)=>{
  return string.charAt(0).toUpperCase() + string.slice(1);
}

</script>