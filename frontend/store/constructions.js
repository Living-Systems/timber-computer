import { atom, computed } from 'nanostores';
import { persistentAtom } from '@nanostores/persistent';
import { getBuildingByNameStore, getSelectionByIds } from '../src/lib/api';

const buildingType = "Typenhaus"


// Persistent Store
// store result in persistent atom

export const storedResult = persistentAtom('timberComputerStoredResult',[], {
    encode (value) {
      return JSON.stringify(value)
    },
    decode (value) {
      try {
        return JSON.parse(value)
      } catch(value) {
        return value
      }
    }
});


// store standard in persistent atom

export const storedStandard = persistentAtom('timberComputerStoredStandard',[], {
    encode (value) {
      return JSON.stringify(value)
    },
    decode (value) {
      try {
        return JSON.parse(value)
      } catch(value) {
        return value
      }
    }
});

// store rating in persistent atom

export const storedRating = persistentAtom('timberComputerStoredRating',[], {
    encode (value) {
      return JSON.stringify(value)
    },
    decode (value) {
      try {
        return JSON.parse(value)
      } catch(value) {
        return value
      }
    }
});

// store selection in persistent atom

export const storedSelection = persistentAtom('timberComputerStoredSelection',[], {
    encode (value) {
      return JSON.stringify(value)
    },
    decode (value) {
      try {
        return JSON.parse(value)
      } catch(value) {
        return value
      }
    }
});


// Construction Fetch & Selection

export const selectedBuilding = atom([]);
export const selectedConstructions = atom([]);
let buildingThreshold = atom([]);
const fetchBuilding = ()=> {
    return new Promise( resolve => {
        resolve(getBuildingByNameStore(buildingType))
    })
};


const setSelectedConstructions = async ()=> {
    const building = await fetchBuilding();

    return new Promise( resolve => {
        buildingThreshold.set(building.data[0].attributes.threshold)
        if(storedSelection.get().length > 0){
            selectedConstructions.set(storedSelection.get());
        } else {
            selectedBuilding.set(building.data[0].attributes.constructions.data)
            selectedConstructions.set(building.data[0].attributes.constructions.data);
            storedSelection.set(building.data[0].attributes.constructions.data)
            setStandard();
        }
        resolve(selectedConstructions.get());
    })
};


// Construction Fetch & Selection By ID List

const fetchBuildingWithSelection = (ids)=> {
    return new Promise( resolve => {
        resolve(getSelectionByIds(buildingType, ids))
    })
};


export const setSelectedConstructionsByIds = async (ids)=> {
    const baseBuilding = await fetchBuilding();
    const building = await fetchBuildingWithSelection(ids);
    // Flatten data structure to match setSelectedConstructions() response
    for (let construction of building.data[0].attributes.constructions.data) {
        for (let component of construction.attributes.components.data) {
            let element = component.attributes.element.data.pop()
            component.attributes.element.data = element;
        }
    }

    return new Promise( resolve => {
        selectedBuilding.set(baseBuilding.data[0].attributes.constructions.data)
        buildingThreshold.set(building.data[0].attributes.threshold);
        selectedConstructions.set(building.data[0].attributes.constructions.data);
        storedSelection.set(building.data[0].attributes.constructions.data);
        setStandard();
        resolve(selectedConstructions.get(), selectedBuilding.get());
    })
};

// Change Selection

export const updateSelection = async (componentId, element) => {
    if ( selectedConstructions.get().length == 0 ) {
        await setSelectedConstructions();
    }

    const allConstructions = selectedConstructions.get();
    for (const construction of allConstructions) {
        for (const component of construction.attributes.components.data){
            if (component.id == componentId) {
                component.attributes.element.data.id = element.id;
                component.attributes.element.data.attributes = element.attributes;
            }
        }
    };

    storedSelection.set(allConstructions);
    selectedConstructions.set(allConstructions);
};


// CO2 Number Calculation

export const setStandard = async () => {
    const building = await fetchBuilding();
    const allConstructions = building.data[0].attributes.constructions.data;

    let calculationCounter = 0;

    for (const construction of allConstructions) {
        for (const component of construction.attributes.components.data){
            calculationCounter += component.attributes.area * component.attributes.element.data.attributes.cradleToLife;
        }
    }
    
    storedStandard.set(calculationCounter);
    return calculationCounter;
};

const getStandard = () => {
    if ( selectedBuilding.get().length == 0 ) {
        return 0;
    }
    const allConstructions = selectedBuilding.get();

    let calculationCounter = 0;

    for (const construction of allConstructions) {
        for (const component of construction.attributes.components.data){
            calculationCounter += component.attributes.area * component.attributes.element.data.attributes.cradleToLife;
        }
    }

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

    storedResult.set(calculationCounter);
    return calculationCounter;
}

export const calculatedCO2      = computed(selectedConstructions, getCO2);
export const calculatedStandard = computed(selectedBuilding, getStandard);


// CO2 Comparison Calculation

export const standardC02 = atom(getCO2());

export const savedCO2 = computed(calculatedCO2, () => {
    const calculatedValue = standardC02.get() - calculatedCO2.get();

    return calculatedValue;
})


// Rating Calculation

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

    storedRating.set(finalRating.rating)
    return finalRating.rating;
});


// Count all Components

export const componentCounter = atom(0);

const countComponents = async () => {
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


// Collapse Component Details

export const detailsCollapsed = atom(true);

export const toggleDetailsCollapsed = () => {
    detailsCollapsed.set(!detailsCollapsed.get());
};


// Active Component

export const activeComponentId = atom(1);

export const setOffset = atom('2rem');

export const changeActive = (operation) => {
    if (operation === 'increment') {
        setOffset.set('2rem');
        if (activeComponentId.get() < componentCounter.get()){
            activeComponentId.set(activeComponentId.get() + 1);
        }
    } else if (operation === 'decrement') {
        setOffset.set('-2rem');
        if (activeComponentId.get() > 1) {
            activeComponentId.set(activeComponentId.get() - 1);
        }
    } else {
        activeComponentId.set(+operation);
    }
};

// Calculations

export const forestValue = 10000;
export const electricityValue = 475;
export const berlinParisValue = 195;

export const calculateSavings = computed([calculatedCO2, calculatedStandard], () => {
    return calculatedStandard.get() - calculatedCO2.get();
});

export const calculatePercentage = computed([calculateSavings, calculatedStandard], () => {
    return Math.floor((100 * calculateSavings.get()) / calculatedStandard.get());
});

export const calculateForest = computed(calculateSavings, () => {
    return Math.round((calculateSavings.get() / forestValue) * 10) / 10;
});

export const calculateElectricity = computed(calculateSavings, () => {
    return Math.floor(calculateSavings.get() / electricityValue);
});

export const calculateFlight = computed(calculateSavings, () => {
    return Math.floor(calculateSavings.get() / berlinParisValue);
});

// Helper

export const kgTonCalculator = (kgValue) => {
    return (kgValue / 1000).toFixed(1) + 't CO₂';
};
