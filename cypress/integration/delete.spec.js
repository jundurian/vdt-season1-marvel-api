
describe('DELETE /characters/id', () => {

    const tochaHumana =
    {
        name: 'Johny Storm',
        alias: 'Tocha Humana',
        team: ['4 fantastico'],
        active: true
    }

    before(() => {
        //cy.back2ThePast()
    });

    context('quando tenho um personagem cadastrado', () => {

        before(() => {
            cy.setToken()
            cy.back2ThePast()
            cy.postCharacter(tochaHumana).then(function (response) {
                Cypress.env('charID', response.body.character_id)
            })
        });


        it('deve apagar o personagem pelo ID', () => {
            cy.deleteCharactersByID(Cypress.env('charID')).then(function (response) {
                expect(response.status).to.eql(204)
            })
        });

        it('reve retornar 404 ao apagar por ID não cadastrado', () => {

            const wrongID = "639b4348a398f1e9b6097595"

            cy.deleteCharactersByID(wrongID).then(function (response) {
                expect(response.status).to.eql(404)
            })
        });

    });

});