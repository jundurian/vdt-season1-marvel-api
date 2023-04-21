// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('setToken', function () {

    cy.api({
        method: 'POST',
        url: '/sessions',
        body: {
            email: 'gabriel@gmail.com',
            password: 'qa-cademy'
        },
        failOnStatusCode: false
    }).then(function (response) {
        expect(response.status).to.eql(200)
        Cypress.env('token', response.body.token)
    });

})

Cypress.Commands.add('back2ThePast', function () {
    cy.api({
        method: 'DELETE',
        url: '/back2thepast/639a06cde484fd0016bc411a',
        failOnStatusCode: false
    }).then(function (response) {
        expect(response.status).to.eql(200)
    });
})

Cypress.Commands.add('postCharacter', function (payload) {

    cy.api({
        method: 'POST',
        url: '/characters',
        body: payload,
        headers: {
            Authorization: Cypress.env('token')
        },
        failOnStatusCode: false
    }).then(function (response) {
        return response
    })

})

Cypress.Commands.add('getCharacters', function () {

    cy.api({
        method: 'GET',
        url: '/characters',
        headers: {
            Authorization: Cypress.env('token')
        },
        failOnStatusCode: false
    }).then(function (response) {
        return response
    })

})

Cypress.Commands.add('searchCharacters', function (charName) {

    cy.api({
        method: 'GET',
        url: '/characters',
        qs: { name: charName },
        headers: {
            Authorization: Cypress.env('token')
        },
        failOnStatusCode: false
    }).then(function (response) {
        return response
    })

})

Cypress.Commands.add('getCharactersByID', function (charID) {

    cy.api({
        method: 'GET',
        url: '/characters/' + charID,
        headers: {
            Authorization: Cypress.env('token')
        },
        failOnStatusCode: false
    }).then(function (response) {
        return response
    })

})


Cypress.Commands.add('deleteCharactersByID', function (charID) {

    cy.api({
        method: 'DELETE',
        url: '/characters/' + charID,
        headers: {
            Authorization: Cypress.env('token')
        },
        failOnStatusCode: false
    }).then(function (response) {
        return response
    })

})


Cypress.Commands.add('populateCharacters', function (characters) {

    characters.forEach(function (c) {
        cy.postCharacter(c)
    });

})