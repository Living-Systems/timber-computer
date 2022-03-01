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
                                            id
                                            attributes {
                                                name
                                                area
                                                elements {
                                                    data {
                                                        id
                                                        attributes {
                                                            name
                                                            frontendName
                                                            cradleToSite
                                                            cradleToLife
                                                            cradleToCradle
                                                            sustainability
                                                            renewableMaterial
                                                            thumbnail {
                                                                data {
                                                                    attributes {
                                                                        formats
                                                                        url
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                                element {
                                                    data {
                                                        id
                                                    }
                                                }
                                                backgroundImage {
                                                    data {
                                                        attributes{
                                                            url
                                                            formats
                                                            alternativeText
                                                            caption
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


// get a single building by its name
export async function getBuildingByNameStore(name) {
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
                        threshold {
                            ... on ComponentBuildingSteps {
                              rating
                              value
                            }
                          }
                    }
                }
            }
        }
    `);
	return data?.buildings;
}

// get the slugs of all pages
export async function getAllPagesWithSlugs() {
	const data = await fetchAPI(`
        {
            pages {
                data {
                    attributes {
                        slug
                        title
                    }
                }
            }
        }
    `);
	return data?.pages;
}

export async function getPageBySlug(slug) {
	const data = await fetchAPI(`
		{
			pages(filters: { slug: { eq: "${slug}" } }) {
				data {
                    attributes {
                        title
                        slug
                        content {
                            __typename
                            ... on ComponentPageText {
                                markdown
                            }
                            ... on ComponentPageImage {
                                image {
                                    data {
                                        attributes {
                                            mime
                                            url
                                            formats
                                            alternativeText
                                            caption
                                        }
                                    }
                                }
                                url
                                style
                            }
                        }
                    }
                }
			}
		}
	`);
	return data?.pages;
}

// get the slugs of all legals
export async function getAllLegalsWithSlugs() {
	const data = await fetchAPI(`
        {
            legals {
                data {
                    attributes {
                        slug
                        title
                    }
                }
            }
        }
    `);
	return data?.legals;
}

export async function getLegalBySlug(slug) {
	const data = await fetchAPI(`
		{
			legals(filters: { slug: { eq: "${slug}" } }) {
				data {
                    attributes {
                        title
                        slug
                        content {
                            __typename
                            ... on ComponentPageText {
                                markdown
                            }
                            ... on ComponentPageImage {
                                image {
                                    data {
                                        attributes {
                                            mime
                                            url
                                            formats
                                            alternativeText
                                            caption
                                        }
                                    }
                                }
                                url
                                style
                            }
                        }
                    }
                }
			}
		}
	`);
	return data?.legals;
}

export async function getSingleTypeHome() {
	const data = await fetchAPI(`
        {
            home {
                data {
                    attributes {
                        title
                        intro
                        backgroundImage {
                            data {
                                attributes {
                                    url
                                    formats
                                    caption
                                    alternativeText
                                }
                            }
                        }
                    }
                }
            }
        }
	`);
	return data?.home;
}

export async function getSingleTypeCompute() {
	const data = await fetchAPI(`
        {
            compute {
                data {
                    attributes {
                        title
                        intro
                        backgroundImage {
                            data {
                                attributes {
                                    url
                                    formats
                                    caption
                                    alternativeText
                                }
                            }
                        }
                    }
                }
            }
        }
	`);
	return data?.compute;
}

export async function getSingleTypeResult() {
	const data = await fetchAPI(`
        {
            result {
                data {
                    attributes {
                        title
                        backgroundImage {
                            data {
                                attributes {
                                    url
                                    formats
                                    caption
                                    alternativeText
                                }
                            }
                        }
                    }
                }
            }
        }
	`);
	return data?.result;
}