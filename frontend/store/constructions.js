import { atom } from 'nanostores';

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
                                attributes {
                                    name
                                    components {
                                        data {
                                            attributes {
                                                name
                                                area
                                                element {
                                                    data {
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

const fetchBuilding = await getBuildingByName(buildingType);
const selectedConstructions = atom(fetchBuilding.data[0].attributes.constructions.data);

const updateConstructions = function updateConstructions(component) {
    console.log(component);
    console.log(constructions);
	// constructions.set(constructions.get().filter((item) => item.attributes.title !== title ));
};

export const activeComponentId = atom('1');

export { 
    selectedConstructions
};