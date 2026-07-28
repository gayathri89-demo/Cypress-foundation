describe('Cypress App',()=>{
    beforeEach(() => {
        cy.visit('http://localhost:3000/signin');
    
            cy.get('#username').type('gayathri123')
            cy.get('#password').type('Test1234')
            cy.contains('button', 'Sign In').click();

            });

 
    it('Observe real API',()=>{
        cy.intercept('GET','**/transactions/public').as('myapi')
        cy.reload();

        cy.wait('@myapi').then((interception)=>{
            expect(interception.request.method).to.eq('GET')
            expect(interception.response.statusCode).to.eq(304);
        })

    })

    it('Request Mocking',()=>{
        cy.intercept('GET','**/transactions/public',(request)=>{
            request.headers['accept']='accept something'
            request.headers['accept-encoding']='accept-encoding something'
        }
        ).as('myapi')
        cy.reload();

        cy.wait('@myapi').then((interception)=>{
            expect(interception.request.method).to.eq('GET')
            expect(interception.response.statusCode).to.eq(304);
            expect(interception.request.headers).to.have.property('accept','accept something')
            expect(interception.request.headers).to.have.property('accept-encoding','accept-encoding something')

        })
    })

    it('Response Mocking',()=>{
            cy.intercept('GET','**/notifications',{
                body:{
                    "results": [
            {
                "userFullName": "Gayathri Nair",
                "id": "ovi-H93vlQ",
                "uuid": "ac88be8c-78ff-4d21-9ac5-a765a472b5a3",
                "userId": "1OISQtLx_",
                "transactionId": "JCX4NNEpn",
                "commentId": "BeVZepkjG",
                "isRead": false,
                "createdAt": "2026-07-27T07:11:20.234Z",
                "modifiedAt": "2026-07-27T07:11:20.234Z"
            }, 
        ]
                }
            
            }
            ).as('myapi')
            cy.reload();

            cy.wait('@myapi').then((interception)=>{
                cy.log(String(interception.response))
                expect(interception.request.method).to.eq('GET')
                expect(interception.response.statusCode).to.eq(200);
                expect(interception.response.body.results[0]).to.have.property('userFullName','Gayathri Nair');
                expect(interception.response.body.results[0]).to.have.property('id','ovi-H93vlQ')

            })
        })

        })