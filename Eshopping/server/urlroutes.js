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
    
    
    '/ofk/hduser/register': {
        methods: {
            CREATE: true,
            UPDATE: true
        },
        description: {
            CREATE: 'is a HTTP POST route, handles the user registration',
            UPDATE: 'is a HTTP PUT route, handles the user registration'
        },
        Validator: validator.HDProfileUserValidator,
        Enforcer: enforcer.HDProfileUserEnforcer,
        Transactor: transacter.HDProfileUserTransactor
    },
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
    '/ofk/localclient/verify': {
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
    '/ofk/user/update': {
        methods: {
            UPDATE: true
        },
        description: {
            UPDATE: 'is a HTTP UPDATE route, to update user profile'
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
    
    '/ofk/file/upload': {
        methods: {
            CREATE: true,
            READ: true
        },
        description: {
            CREATE: 'is a HTTP POST route, handles the file upload',
            READ: 'is a HTTP GET route, returns the uploaded files'
        },
        Validator: validator.FileUploadValidator,
        Enforcer: enforcer.FileUploadEnforcer,
        Transactor: transacter.FileUploadTransactor
    },
    '/user/password': {
        methods: {
            UPDATE: true
        },
        description: {
            UPDATE: 'is a HTTP UPDATE route, to change the user password'
        },
        Validator: validator.UserPasswordValidator,
        Enforcer: enforcer.UserPasswordEnforcer,
        Transactor: transacter.UserPasswordTransactor
    },
    '/ofk/password/forgot': {
        methods: {
            CREATE: true,
            READ: true
        },
        description: {
            CREATE: 'To handle forgot password',
            READ: 'To handle forgot password Reset Password'
        },
        Validator: validator.UserForgotPasswordValidator,
        Enforcer: enforcer.UserForgotPasswordEnforcer,
        Transactor: transacter.UserForgotPasswordTransactor
    },
    '/ofk/user/updateuserprofile': {
        methods: {
            UPDATE: true
        },
        description: {
            UPDATE: 'is a HTTP UPDATE route, to change the user password or user email'
        },
        Validator: validator.UpdateUserProfileValidator,
        Enforcer: enforcer.UpdateUserProfileEnforcer,
        Transactor: transacter.UpdateUserProfileTransactor
    }
    


};

exports.APIs = apis;