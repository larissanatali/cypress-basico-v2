/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function () {
    beforeEach(function () {
        cy.visit('./src/index.html');
    })
    it('verifica o título da aplicação', function () {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })
    it('Preencher os campos obrigatório e enviar formulario', function () {
        const longText = 'No objeto de `options` que podemos passar ao comando `.type()`, é possível sobrescrever o `delay` padrão por outro valor (em milissegundos).'
        cy.get('#firstName').type('Lucia')
        cy.get('#lastName').type('Almeida')
        cy.get('#email').type('lucia.almeida@mailinator.com')
        cy.get('#phone').type('11948986865')
        cy.get('#open-text-area').type(longText, {
            delay: 0
        })
        cy.get('button[type="submit"]').click()
        cy.get('.success').should('be.visible')
    });
    it('Exibe mensagem de erro ao digitar um e-mail invalido', function () {
        cy.get('#firstName').type('Lucia')
        cy.get('#lastName').type('Almeida')
        cy.get('#email').type('lucia.almeida@mailinator,com')
        cy.get('#phone').type('11948986865')
        cy.get('#open-text-area').type('Teste')
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')
    });
    it('Exibe mensagem de erro ao digitar um telefone invalido, o campo continua vazio', function () {
        const longText = 'No objeto de `options` que podemos passar ao comando `.type()`, é possível sobrescrever o `delay` padrão por outro valor (em milissegundos).'
        cy.get('#phone')
            .type('abcdefg')
            .should('have.value', '')
    });
    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
        cy.get('#firstName').type('Lucia')
        cy.get('#lastName').type('Almeida')
        cy.get('#email').type('lucia.almeida@mailinator.com')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('Teste')
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')
    });
    it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
        const longText = 'No objeto de `options` que podemos passar ao comando `.type()`, é possível sobrescrever o `delay` padrão por outro valor (em milissegundos).'
        cy.get('#firstName')
            .type('Lucia')
            .should('have.value', 'Lucia')
            .clear()
            .should('have.value', '')
        cy.get('#lastName')
            .type('Almeida')
            .should('have.value', 'Almeida')
            .clear()
            .should('have.value', '')
        cy.get('#email')
            .type('lucia.almeida@mailinator.com')
            .should('have.value', 'lucia.almeida@mailinator.com')
            .clear()
            .should('have.value', '')
        cy.get('#phone')
            .type('11948986865')
            .should('have.value', '11948986865')
            .clear()
            .should('have.value', '')
        cy.get('#open-text-area').type(longText, {
                delay: 0
            })
            .should('have.value', longText)
            .clear()
            .should('have.value', '')
    });
    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')
    });
    it('envia o formuário com sucesso usando um comando customizado', () => {
        cy.fillMandatoryFieldsAndSubmit()
    });
    it('envia o formuário com sucesso contains', () => {
        const longText = 'No objeto de `options` que podemos passar ao comando `.type()`, é possível sobrescrever o `delay` padrão por outro valor (em milissegundos).'
        cy.get('#firstName').type('Lucia')
        cy.get('#lastName').type('Almeida')
        cy.get('#email').type('lucia.almeida@mailinator.com')
        cy.get('#phone').type('11948986865')
        cy.get('#open-text-area').type(longText, {
            delay: 0
        })
        cy.contains('button', 'Enviar').click()
        cy.get('.success').should('be.visible')
    });
    it('Seleciona o combo-box utilizando "Select"', () => {
        cy.get('select').select('Blog')
        cy.get('select').select('youtube')
        cy.get('select').select(3)
    });
    it('seleciona um produto (YouTube) por seu texto', () => {
        cy.get('#product')
            .select('YouTube')
            .should('have.value', 'youtube')
    });
    it('seleciona um produto (mentoria) por seu texto', () => {
        cy.get('#product')
            .select('mentoria')
            .should('have.value', 'mentoria')
    });
    it('seleciona um produto (Blog) por seu índice', () => {
        cy.get('select')
            .select(1)
            .should('have.value', 'blog')
    });
    it('marca o tipo de atendimento "Feedback"', () => {
        cy.get('input[type="radio"][value="feedback"]')
            .check()
            .should('have.value', 'feedback')
    });
    it('marca cada tipo de atendimento', function () {
        cy.get('input[type="radio"]')
            .should('have.length', 3)
            .each(function ($radio) {
                cy.wrap($radio).check()
                cy.wrap($radio).should('be.checked')
            })
    });
    it('marca ambos checkboxes, depois desmarca o último', () => {
        cy.get('input[type="checkbox"]')
            .check()
            .uncheck()
    });
    it('marca ambos checkboxes, depois desmarca o último', () => {
        cy.get('input[type="checkbox"]')
            .check()
            .first()
            .should('be.checked')
            .last()
            .uncheck()
            .should('not.be.checked')
    });
    it('seleciona um arquivo da pasta fixtures', () => {
        cy.get('input[type="file"]#file-upload')
            .should('not.have.value')
            .selectFile('cypress/fixtures/example.json')
            .should(function ($input) {
                console.log($input);
                expect($input[0].files[0].name).to.equal('example.json')
            })
    });
    it('seleciona um arquivo simulando um drag-and-drop', function () {
        cy.get('input[type="file"]#file-upload')
            .should('not.have.value')
            .selectFile('cypress/fixtures/example.json', {
                action: 'drag-drop'
            })
            .should(function ($input) {
                console.log($input);
                expect($input[0].files[0].name).to.equal('example.json')
            })
    });
    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function () {
        cy.fixture('example.json').as('file')
        cy.get('input[type="file"]#file-upload')
            .should('not.have.value')
            .selectFile('@file')
            .should(function ($input) {
                console.log($input);
                expect($input[0].files[0].name).to.equal('example.json')
            })
    });
    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function() {
        cy.get('#privacy a').should('have.attr', 'target', '_blank')
    });
    it('acessa a página da política de privacidade removendo o target e então clicanco no link', () => {
        cy.get('#privacy a')
            .invoke('removeAttr', 'target')
            .click()
        cy.contains('Talking About Testing').should('be.visible')
    });
    it('testa a página da política de privavidade de forma independente', () => {
    const text1 = 'Não salvamos dados submetidos no formulário da aplicação CAC TAT.'
    const text2 = 'Utilzamos as tecnologias HTML, CSS e JavaScript, para simular uma aplicação real.'
    const text3 = 'No entanto, a aplicação é um exemplo, sem qualquer persistência de dados, e usada para fins de ensino.'
        
        cy.visit('./src/privacy.html')
        cy.contains(text1)
        cy.contains(text2)
        cy.contains(text3)
        cy.contains('Talking About Testing').should('be.visible')
    });
})