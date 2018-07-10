'use strict';

/**
 * This is like mapping of all routes with their controllers later we are using
 * these object to validate route(in route controller)
 */

var validator = require('../validater');
var enforcer = require('../enforcer');
var transacter = require('../transactor');

/**
 * Routes and their corresponding handlers
 */

var apis = {
    '/ofk/client/verify': {
        methods: {
            READ: true
        },
        description: {
            READ: 'is a HTTP GET route, handles the client verification'
        },
        Validator: validator.OauthValidator,
        Enforcer: enforcer.OauthEnforcer,
        Transactor: transacter.OauthTransactor
    },
    '/ofk/user/register': {
        methods: {
            CREATE: true
        },
        description: {
            CREATE: 'is a HTTP POST route, handles the user registration'
        },
        Validator: validator.UserProfileValidator,
        Enforcer: enforcer.UserProfileEnforcer,
        Transactor: transacter.UserProfileTransactor
    },
    '/ofk/user/details': {
        methods: {
            READ: true
        },
        description: {
            READ: 'is a HTTP READ route, to get the records based on query'
        },
        Validator: validator.UserDetailsValidator,
        Enforcer: enforcer.UserDetailsEnforcer,
        Transactor: transacter.UserDetailsTransactor
    },
    '/ofk/validate/session': {
        methods: {
            DELETE: true,
            READ: true
        },
        description: {
            DELETE: 'is a HTTP DELETE route, to clear the auth session',
            READ: 'is a HTTP DELETE route, to validate the auth session'
        },
        Validator: validator.AuthTokenValidator,
        Enforcer: enforcer.AuthTokenEnforcer,
        Transactor: transacter.AuthTokenTransactor
    },
    '/ofk/login': {
        methods: {
            CREATE: false,
            DELETE: true
        },
        description: {
            CREATE: 'is a HTTP POST route, handles the user login',
            DELETE: 'is a HTTP DELETE route, handles the user logout'
        },
        Validator: validator.UserLoginValidator,
        Enforcer: enforcer.UserLoginEnforcer,
        Transactor: transacter.UserLoginTransactor
    },
    
    '/ofk/user/products': {
        methods: {
            UPDATE: true,
            READ:true,
            CREATE : true,
            DELETE : true
        },
        description: {
            UPDATE: 'is a HTTP UPDATE route, to change the user password or user email'
        },
        Validator: validator.ProductValidator,
        Enforcer: enforcer.ProductEnforcer,
        Transactor: transacter.ProductTransactor
    },
    '/ofk/user/shopproducts': {
        methods: {
            UPDATE: true,
            READ:true,
            CREATE : true,
            DELETE : true
        },
        description: {
            UPDATE: 'is a HTTP UPDATE route, to change the user password or user email'
        },
        Validator: validator.ShopProductValidator,
        Enforcer: enforcer.ShopProductEnforcer,
        Transactor: transacter.ShopProductTransactor
    },
    '/ofk/user/order': {
        methods: {
            UPDATE: true,
            READ:true,
            CREATE : true,
            DELETE : true
        },
        description: {
            UPDATE: 'is a HTTP UPDATE route, to change the user password or user email'
        },
        Validator: validator.OrderValidator,
        Enforcer: enforcer.OrderEnforcer,
        Transactor: transacter.OrderTransactor
    }
};

exports.APIs = apis;