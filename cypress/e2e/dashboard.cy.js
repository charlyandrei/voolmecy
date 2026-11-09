describe('Usuário logado na página de dashboard', () => {
    beforeEach(() => {
        cy.fixture('especialistas.json').as('especialistas')
        cy.fixture('clinica').then((clinicas) => {
            const clinica = clinicas[0]
            cy.login(clinica.email, clinica.senha)
        })
    })

    context('Redirecionamento na página de dashboard', () => {
        it('Verifica página de redirecionamento no login com sucesso', () => {
            cy.visit('/dashboard')
            cy.url().should('eq', 'http://localhost:3000/dashboard')
        })

        it('Com o usuário logado, abre o cadastro de especialista', () => {
            cy.visit('/dashboard')
            cy.url().should('eq', 'http://localhost:3000/dashboard')
            cy.contains('Cadastrar especialista').should('be.visible').click()
        })
    })

    context('Modal de cadastro de especialista', () => {
        it('Verifica se o checkbox "Atende por plano?" está desmarcado', () => {
            cy.visit('/dashboard')
            cy.contains('Cadastrar especialista').should('be.visible').click()
            cy.get('input[type="checkbox"][aria-label="Atende por plano?"]')
                .should('not.be.checked')
        })

        it('Exibe os planos de saúde ao marcar "Atende por plano?"', () => {
            cy.visit('/dashboard')
            cy.contains('Cadastrar especialista').should('be.visible').click()
            cy.get('input[type="checkbox"][aria-label="Atende por plano?"]').check()
            cy.get('.MuiFormGroup-root input[type="checkbox"]')
                .should('have.length.greaterThan', 0)
                .and('be.enabled')
                .check(['Sulamerica', 'Unimed', 'Bradesco'])
        })

        it('Exibe os planos após preencher o formulário do especialista', () => {
            cy.get('@especialistas').then((dados) => {
                const especialista = dados.especialistas[0]
                cy.cadastraEspecialista(
                    especialista.nome,
                    especialista.email,
                    especialista.senha,
                    especialista.especialidade,
                    especialista.crm,
                    especialista.imagem,
                    especialista.cep,
                    especialista.rua,
                    especialista.numero,
                    especialista.complemento,
                    especialista.estado
                )
                cy.get('input[type="checkbox"][aria-label="Atende por plano?"]').check()
                cy.get('.MuiFormGroup-root').scrollIntoView()
                cy.get('.MuiFormGroup-root').should('be.visible')
            })
        })
    })
})
