/// <reference types="Cypress" />

describe('GET /characters', () => {

    const characters = [
        {
            name: 'Charler Xavier',
            alias: 'Professor X',
            team: ['x-men'],
            active: true
        },
        {
            name: 'Logan',
            alias: 'Wolverine',
            team: ['x-men'],
            active: true
        },
        {
            name: 'Peter Parker',
            alias: 'Homem Aranha',
            team: ['Vingadores'],
            active: true
        }
    ]

    before(() => {
        //cy.back2ThePast()
        cy.populateCharacters(characters)
    });

    it('deve retornar uma lista de personagens', () => {

        cy.getCharacters()
            .then(function (response) {
                expect(response.status).to.eql(200)
                expect(response.body).to.be.a('array')
                expect(response.body.length).greaterThan(0)
                expect(response.body.length).to.eql(characters.length)
            })
    });

    it('deve buscar personagem por nome', () => {

        cy.searchCharacters('Logan')
            .then(function (response) {
                expect(response.status).to.eql(200)
                expect(response.body.length).to.eql(1)
                expect(response.body[0].alias).to.eql('Wolverine')
                expect(response.body[0].team).to.eql(['x-men'])
                expect(response.body[0].active).to.eql(true)
            })
    });

});

describe('GET /characters/id', () => {

    const tonyStark =
    {
        name: 'Tony Stark',
        alias: 'Homem de Ferro',
        team: ['Vingadores'],
        active: true
    }


    before(() => {
        //cy.back2ThePast()
    });

    context('quando tenho um personagem cadastrado', () => {

        before(() => {
            cy.setToken()
            cy.back2ThePast()
            cy.postCharacter(tonyStark).then(function (response) {
                Cypress.env('charID', response.body.character_id)
            })
        });


        it('deve buscar o personagem pelo ID', () => {
            cy.getCharactersByID(Cypress.env('charID')).then(function (response) {
                expect(response.status).to.eql(200)
                expect(response.body.alias).to.eql('Homem de Ferro')
                expect(response.body.team).to.eql(['Vingadores'])
                expect(response.body.active).to.eql(true)

            })
        });

        it('reve retornar 404 ao buscar por ID não cadastrado', () => {

            const wrongID = "639b4348a398f1e9b6097595"

            cy.getCharactersByID(wrongID).then(function (response) {
                expect(response.status).to.eql(404)
            })
        });

    });

});