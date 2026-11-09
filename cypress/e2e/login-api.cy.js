describe('teste de login via API', () => {
    const email = 'clinica@gmail.com';
    const senha = '4321';
    const apiClinica = 'http://localhost:8080/clinica';

    context('Testes em rotas com usuário autorizado', () => {
        beforeEach(() => {
            cy.fixture('clinica').then((clinicas) => {
                const clinica = clinicas[0]
                cy.loginApi(clinica.email, clinica.senha)
            })
        })

        it('GET via url front para teste em resposta da home', () => {
            cy.request('GET', '/').should((response) => {
                expect(response.status).to.eq(200);
            })
        })

        it('Deve verificar se o token de autenticação é retornado após login via POST na API', () => {
            cy.get('@token').should('exist');
        })
    });
    context('Requisições de usuário clínica em especialistas', () => {
        beforeEach(() => {
            cy.fixture('especialistas.json').as('especialistas')
            cy.loginApi(email, senha)

        })

        it('POST em especialistas', () => {
            cy.get('@especialistas').then((dados) => {
                const especialista = dados.especialistas[0];
                cy.request({
                    method: 'POST',
                    url: apiClinica,
                    body: {
                        nome: especialista.nome,
                        email: especialista.email,
                        senha: especialista.senha,
                        endereco: {
                            cep: especialista.cep,
                            rua: especialista.rua,
                            numero: especialista.numero,
                            complemento: especialista.complemento,
                            estado: especialista.estado
                        }
                    }
                }).then((response) => {
                    if (response.status === 201) {
                        cy.log(`O status ${response.status} não é o padrão 201`);
                        expect(response.body).to.have.property('id');
                        expect(response.body).to.have.property('nome');
                        expect(response.body).to.have.property('email');
                    }
                });
            });
        });
    });
});

