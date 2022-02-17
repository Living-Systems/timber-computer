const API_URL = import.meta.env.PUBLIC_STRAPI_URL;
const API_TOKEN = import.meta.env.PUBLIC_STRAPI_TOKEN;

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
                    id
                    attributes {
                        constructions {
                            data {
                                id
                                attributes {
                                    name
                                    components {
                                        data {
                                            attributes {
                                                name
                                                area
                                                elements {
                                                    data {
                                                        id
                                                        attributes {
                                                            name
                                                            cradleToSite
                                                            cradleToLife
                                                            cradleToCradle
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
