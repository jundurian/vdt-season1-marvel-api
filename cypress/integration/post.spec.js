/// <reference types="Cypress" />

describe('POST /characters', () => {

    before(() => {
        //cy.back2ThePast()
    });

    it('deve cadastrar um personagem', () => {

        const character = {
            name: 'Prof Xavier',
            alias: 'Professor X',
            team: ['x-men', 'illuminati'],
            active: true
        }

        cy.postCharacter(character)
            .then(function (response) {
                expect(response.status).to.eql(201)
                expect(response.body.character_id.length).to.eql(24)
            })

    });

    context('quando o personagem já existe', () => {

        const character2 = {
            name: 'Clark Kent',
            alias: 'Super homem',
            team: ['x-men', 'illuminati'],
            active: true
        }

        before(() => {

            cy.postCharacter(character2)
                .then(function (response) {
                    expect(response.status).to.eql(201)
                })

        });

        it('não deve cadastrar duplicado', () => {

            cy.postCharacter(character2)
                .then(function (response) {
                    expect(response.status).to.eql(400)
                    expect(response.body.error).to.eql("Duplicate character")
                })

        });

    });

    context.only('quando faltam campos', () => {

        const semName = {
            alias: 'Super homem',
            team: ['x-men', 'illuminati'],
            active: true
        }

        const semAlias = {
            name: 'Clark Kent',
            team: ['x-men', 'illuminati'],
            active: true
        }

        const semTeam = {
            name: 'Clark Kent',
            alias: 'Super homem',
            active: true
        }

        const semActive = {
            name: 'Clark Kent',
            alias: 'Super homem',
            team: ['x-men', 'illuminati'],
        }

        it('não deve cadastrar sem nome', () => {

            cy.postCharacter(semName)
            .then(function(response){
                expect(response.status).to.eql(400)
            })

        });

        it('não deve cadastrar sem alias', () => {

            cy.postCharacter(semAlias)
            .then(function(response){
                expect(response.status).to.eql(400)
            })

        });

        it('não deve cadastrar sem time', () => {

            cy.postCharacter(semTeam)
            .then(function(response){
                expect(response.status).to.eql(400)
            })

        });

        it('não deve cadastrar sem active', () => {

            cy.postCharacter(semActive)
            .then(function(response){
                expect(response.status).to.eql(400)
            })

        });

    });
    
});