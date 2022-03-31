Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(){
    cy.get('#firstName').type('Lucia')
    cy.get('#lastName').type('Almeida')
    cy.get('#email').type('lucia.almeida@mailinator.com')
    cy.get('#phone').type('11948986865')
    cy.get('#open-text-area').type('Teste')
    cy.get('button[type="submit"]').click()
    cy.get('.success').should('be.visible')
})