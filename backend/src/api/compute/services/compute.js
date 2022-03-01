'use strict';

/**
 * compute service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::compute.compute');
