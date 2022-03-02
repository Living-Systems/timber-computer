'use strict';

/**
 * compute router.
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::compute.compute');
