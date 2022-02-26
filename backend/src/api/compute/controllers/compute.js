'use strict';

/**
 *  compute controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::compute.compute');
