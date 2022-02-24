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


// * CO2 Number Calculation

const getCO2 = () => {
    const allConstructions = selectedConstructions.get();

    let calculationCounter = 0;

    for (const construction of allConstructions) {

        for (const component of construction.attributes.components.data){
            calculationCounter += component.attributes.area * component.attributes.element.data.attributes.cradleToLife;
        }
    }

    return calculationCounter;
}

export const calculatedCO2 = computed(selectedConstructions, getCO2);


// * Comparison Calculation

export const standardC02 = atom(getCO2());

export const savedCO2 = computed(calculatedCO2, () => {
    return standardC02.get() - calculatedCO2.get();
})


// todo: put fields for this in database
// export const compareValues = atom({
//     'electricity': {
//         value: 475,
//         interval: 'year',
//         description: 'times the electricity consumption of one person per year'
//     },
//     'berlin-paris': {
//         value: 195,
//         interval: 'single',
//         description: 'flights Berlin-Paris Economy Class'
//     }
// });


// * Rating Calculation

export const rating = computed(calculatedCO2, ()=> {
    const threshold = fetchBuilding.data[0].attributes.threshold;
    threshold.sort((a, b) => b.value - a.value);

    let finalRating = {
        value:0,
        rating:'F'
    };

    for (const [index, trsh] of threshold.entries()) {
        if (trsh.value < calculatedCO2.get()){
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


// * Collapse Component Details

export const detailsCollapsed = atom(true);

export const toggleDetailsCollapsed = () => {
    detailsCollapsed.set(!detailsCollapsed.get());
};


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


// * Helper

export const kgTonCalculator = (kgValue) => {
    return (kgValue / 1000).toFixed(1) + 't CO₂';
}