    describe('API Testing',()=>
    {
        const base_url='https://jsonplaceholder.typicode.com/'
        it('Gets user details',()=>{
            cy.request('GET', `${base_url}/posts/1`)
            .then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body.userId).to.eq(1);
                expect(response.body.title).to.eq("sunt aut facere repellat provident occaecati excepturi optio reprehenderit");
            })
        })

            it('Creates a new post', () => {
            cy.request('POST', `${base_url}/posts`, {
            title: 'Cypress API Testing',
            body: 'Learning POST request using Cypress',
            userId: 1
            })
            .then((response) => {
            expect(response.status).to.eq(201);
            expect(response.body.title).to.eq('Cypress API Testing');
            expect(response.body.body).to.eq(
                'Learning POST request using Cypress'
            );
            expect(response.body.userId).to.eq(1);
            expect(response.body).to.have.property('id');
            });
        });

        it('Updates the complete post using PUT', () => {
        cy.request('PUT', `${base_url}/posts/1`, {
        id: 1,
        title: 'Updated Post Title',
        body: 'Complete post updated using PUT',
        userId: 1
        })
        .then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.id).to.eq(1);
        expect(response.body.title).to.eq('Updated Post Title');
        expect(response.body.body).to.eq(
            'Complete post updated using PUT'
        );
        expect(response.body.userId).to.eq(1);
        });
    });

    it('Partially updates the post using PATCH', () => {
        cy.request('PATCH', `${base_url}/posts/1`, {
        title: 'Partially Updated Title'
        })
        .then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.id).to.eq(1);
        expect(response.body.title).to.eq(
            'Partially Updated Title'
        );
        expect(response.body.userId).to.eq(1);
        expect(response.body).to.have.property('body');
        });
    });

    it('Deletes the post', () => {
        cy.request('DELETE', `${base_url}/posts/1`)
        .then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.deep.equal({});
        });
    });
    })