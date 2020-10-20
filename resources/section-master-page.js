'use strict';

const assign = require('lodash/assign');
const pick = require('lodash/pick');

const base = require('../mixins/base');

/**
 * Creates a SectionMasterPage instance.
 *
 * @param {Shopify} shopify Reference to the Shopify instance
 * @constructor
 * @public
 */
function SectionMasterPage(shopify) {
  this.shopify = shopify;

  this.name = 'master_pages';
  this.key = 'master_pages';
}

assign(
  SectionMasterPage.prototype,
  pick(base, ['buildUrl', 'delete', 'count'])
);

/**
 * Gets a single product by its ID.
 *
 * @param {Number} id SectionMasterPage ID
 * @param {Object} [params] Query parameters
 * @return {Promise} Promise that resolves with the result
 * @public
 */
SectionMasterPage.prototype.get = function get(id, params) {
  const url = this.buildUrl(id, params);
  const headers = {};

  if (this.shopify.options.presentmentPrices) {
    headers['X-Shopify-Api-Features'] = 'include-presentment-prices';
  }

  return this.shopify.request(url, 'GET', this.key, undefined, headers);
};

/**
 * Creates a new product.
 *
 * @param {Object} params SectionMasterPage properties
 * @return {Promise} Promise that resolves with the result
 * @public
 */
SectionMasterPage.prototype.create = function create(params) {
  const url = this.buildUrl();
  const headers = {};

  if (this.shopify.options.presentmentPrices) {
    headers['X-Shopify-Api-Features'] = 'include-presentment-prices';
  }

  return this.shopify.request(url, 'POST', this.key, params, headers);
};

/**
 * Gets a list of products.
 *
 * @param {Object} params Query parameters
 * @return {Promise} Promise that resolves with the result
 * @public
 */
SectionMasterPage.prototype.list = function list(params) {
  const url = this.buildUrl(undefined, params);
  const headers = {};

  if (this.shopify.options.presentmentPrices) {
    headers['X-Shopify-Api-Features'] = 'include-presentment-prices';
  }

  return this.shopify.request(url, 'GET', this.name, undefined, headers);
};

/**
 * Updates a product.
 *
 * @param {Number} id SectionMasterPages ID
 * @param {Object} params SectionMasterPages properties
 * @return {Promise} Promise that resolves with the result
 * @public
 */
SectionMasterPage.prototype.update = function update(id, params) {
  const url = this.buildUrl(id);
  const headers = {};

  if (this.shopify.options.presentmentPrices) {
    headers['X-Shopify-Api-Features'] = 'include-presentment-prices';
  }

  return this.shopify.request(url, 'PUT', this.key, params, headers);
};

module.exports = SectionMasterPage;
