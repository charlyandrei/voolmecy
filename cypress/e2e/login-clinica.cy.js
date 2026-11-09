describe('Página de Login', () => {
    const email = 'clinica@gmail.com';
    const senha = '4321';

    beforeEach(() => {
        cy.visit('')
        cy.contains('Entrar').click()
    })
    it('Digita email e senha corretos para efetuar o login', () => {
        cy.login(email, senha)

    })
})