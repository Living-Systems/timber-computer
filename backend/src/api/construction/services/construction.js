'use strict';

/**
 * construction service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::construction.construction');
