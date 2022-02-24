import { atom, computed } from 'nanostores';
import { getBuildingByNameStore } from '../src/lib/api';

const API_URL      = import.meta.env.PUBLIC_STRAPI_URL;
const API_TOKEN    = import.meta.env.PUBLIC_STRAPI_TOKEN;
const buildingType = "Typenhaus"

// * Construction Fetch & Selection

const fetchBuilding = await getBuildingByNameStore(buildingType);
const selectedConstructions = atom(fetchBuilding.data[0].attributes.constructions.data);


// * Change Selection

export const updateSelection = (componentId, element) => {
    const allConstructions = selectedConstructions.get();
    for (const construction of allConstructions) {
        for (const component of construction.attributes.components.data){
            if (component.id == componentId) {
                component.attributes.element.data.attributes = element.attributes;
            }
        }
    };

    selectedConstructions.set(allConstructions);
};


// * Calculation

export const calculation = computed(selectedConstructions, ()=>{
    const allConstructions = selectedConstructions.get();

    let calculationCounter = 0;

    for (const construction of allConstructions) {

        for (const component of construction.attributes.components.data){
            calculationCounter += component.attributes.area * component.attributes.element.data.attributes.cradleToLife;
        }
    }

    return calculationCounter;
});


// * Rating

export const rating = computed(calculation, ()=> {
    const threshold = fetchBuilding.data[0].attributes.threshold;
    threshold.sort((a, b) => b.value - a.value);

    let finalRating = {
        value:0,
        rating:'F'
    };

    for (const [index, trsh] of threshold.entries()) {
        if (trsh.value < calculation.get()){
            finalRating.value = threshold[index-1].value;
            finalRating.rating = threshold[index-1].rating;
            break;
        }
    }

    return finalRating.rating;
});


// * Count all Components

export const componentCounter = atom(0);

for (const construction of selectedConstructions.get()) {
    for (const component of construction.attributes.components.data) {
        componentCounter.set(componentCounter.get() + 1);
    }
}


// * Active Component 

export const activeComponentId = atom(1);

export const changeActive = (operation) => {

    if (operation === 'increment') {
        if (activeComponentId.get() < componentCounter.get()){
            activeComponentId.set(activeComponentId.get() + 1);
        }
    } else if (operation === 'decrement') {
        if (activeComponentId.get() > 1) {
            activeComponentId.set(activeComponentId.get() - 1);
        }
    } else {
        activeComponentId.set(+operation);
    }
};