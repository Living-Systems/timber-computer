import { atom, computed } from 'nanostores';
import { persistentAtom } from '@nanostores/persistent';
import { getBuildingByNameStore } from '../src/lib/api';

const API_URL      = import.meta.env.PUBLIC_STRAPI_URL;
const API_TOKEN    = import.meta.env.PUBLIC_STRAPI_TOKEN;
const buildingType = "Typenhaus"

// * Construction Fetch & Selection
let selectedConstructions = atom([]);
let buildingThreshold = atom([]);
const fetchBuilding = ()=> {
    return new Promise( resolve => {
        resolve(getBuildingByNameStore(buildingType))
    })
};

const setSelectedConstructions = async ()=> {
    const building = await fetchBuilding();
    return new Promise( resolve => {
        selectedConstructions.set(building.data[0].attributes.constructions.data)
        buildingThreshold.set(building.data[0].attributes.threshold)
        setStandard();
        resolve(selectedConstructions.get())
    })
}


// * Change Selection

export const updateSelection = async (componentId, element) => {
    if ( selectedConstructions.get().length == 0 ) {
        await setSelectedConstructions();
    }
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

export const setStandard = () => {
    if ( selectedConstructions.get().length == 0 ) {
        return 0;
    }
    const allConstructions = selectedConstructions.get();

    let calculationCounter = 0;

    for (const construction of allConstructions) {
        for (const component of construction.attributes.components.data){
            calculationCounter += component.attributes.area * component.attributes.element.data.attributes.cradleToLife;
        }
    }

    // sessionStorage.setItem('standardCO2', calculationCounter);
    storedStandard.set(calculationCounter);
    return calculationCounter;
};

const getCO2 = () => {
    if ( selectedConstructions.get().length == 0 ) {
        return 0;
    }
    const allConstructions = selectedConstructions.get();

    let calculationCounter = 0;

    for (const construction of allConstructions) {
        for (const component of construction.attributes.components.data){
            calculationCounter += component.attributes.area * component.attributes.element.data.attributes.cradleToLife;
        }
    }

    // sessionStorage.setItem('calculatedCO2', calculationCounter);

    console.log(calculationCounter);
    storedResult.set(calculationCounter);

    return calculationCounter;
}

export const calculatedCO2 = computed(selectedConstructions, getCO2);


// * Comparison Calculation

export const standardC02 = atom(getCO2());

export const savedCO2 = computed(calculatedCO2, () => {
    const calculatedValue = standardC02.get() - calculatedCO2.get();

    storedSaving.set(calculatedValue);
    return calculatedValue;
})


// * Rating Calculation

export const rating = computed([buildingThreshold, calculatedCO2], ()=> {
    if ( buildingThreshold.get().length === 0) {
        return 0
    }
    const threshold = buildingThreshold.get();
    threshold.sort((a, b) => b.value - a.value);

    let finalRating = {
        value:0,
        rating:'A'
    };

    for (const [index, trsh] of threshold.entries()) {
        if (trsh.value < calculatedCO2.get()){
            if(index == 0){
                finalRating.value = threshold[index].value;
                finalRating.rating = threshold[index].rating;
                break;
            }
            finalRating.value = threshold[index-1].value;
            finalRating.rating = threshold[index-1].rating;
            break;
        }
    };


    // sessionStorage.setItem('rating', finalRating.rating);

    storedRating.set(finalRating.rating)
    return finalRating.rating;
});


// * Count all Components

export const componentCounter = atom(0);

const countComponents = async ()=> {
    if ( selectedConstructions.get().length == 0 ) {
        await setSelectedConstructions();
    }
    for (const construction of selectedConstructions.get()) {
        for (const component of construction.attributes.components.data) {
            componentCounter.set(componentCounter.get() + 1);
        }
    }
}
countComponents();
// for (const construction of selectedConstructions.get()) {
//     for (const component of construction.attributes.components.data) {
//         componentCounter.set(componentCounter.get() + 1);
//     }
// }


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

// * store result in persistent atom

export const storedResult = persistentAtom('timberComputerStoredResult',[], {
    encode (value) {
      return JSON.stringify(value)
    },
    decode (value ) {
      try {
        return JSON.parse(value)
      } catch(value) {
        return value
      }
    }
});

// * store result in persistent atom

export const storedSaving = persistentAtom('timberComputerStoredSaving',[], {
    encode (value) {
      return JSON.stringify(value)
    },
    decode (value ) {
      try {
        return JSON.parse(value)
      } catch(value) {
        return value
      }
    }
});

// * store result in persistent atom

export const storedStandard = persistentAtom('timberComputerStoredStandard',[], {
    encode (value) {
      return JSON.stringify(value)
    },
    decode (value ) {
      try {
        return JSON.parse(value)
      } catch(value) {
        return value
      }
    }
});

// * store result in persistent atom

export const storedRating = persistentAtom('timberComputerStoredRating',[], {
    encode (value) {
      return JSON.stringify(value)
    },
    decode (value ) {
      try {
        return JSON.parse(value)
      } catch(value) {
        return value
      }
    }
});