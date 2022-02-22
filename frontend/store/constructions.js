import { atom, computed } from 'nanostores';

const API_URL      = import.meta.env.PUBLIC_STRAPI_URL;
const API_TOKEN    = import.meta.env.PUBLIC_STRAPI_TOKEN;
const buildingType = "Typenhaus"

// fetchAPI request to strapi graphql layer
async function fetchAPI(query, { variables } = {}) {
	const headers = { 'Content-Type': 'application/json', 'Authorization': API_TOKEN };
	const res = await fetch(API_URL, {
		method: 'POST',
		headers,
		body: JSON.stringify({ query, variables }),
	});
	const json = await res.json();
	if (json.errors) {
		console.log(json.errors);
		throw new Error('Failed to fetch API');
	}
	return json.data;
}

// get a single building by its name
export async function getBuildingByName(name) {
	const data = await fetchAPI(`
        {
            buildings(filters: { name: { eq: "${name}" } } ) {
                data {
                    attributes {
                        constructions {
                            data {
                                id
                                attributes {
                                    name
                                    components {
                                        data {
                                            id
                                            attributes {
                                                name
                                                area
                                                element {
                                                    data {
                                                        id
                                                        attributes {
                                                            frontendName
                                                            cradleToSite
                                                            cradleToLife
                                                            cradleToCradle
                                                            sustainability
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    `);
	return data?.buildings;
}

// * Construction Fetch & Selection

const fetchBuilding = await getBuildingByName(buildingType);
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
        activeComponentId.set(operation);
    }
};