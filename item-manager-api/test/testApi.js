const should = require('chai').should();
const expect = require('chai').expect();
const supertest = require('supertest');
const api = supertest('http://localhost:3000')

describe('Item', function () {
    it('should return a 200 when getting all records', (done) => {
        api.get('/items')
            .expect(200, done);
    })
    it('it should  POST a valid item', (done) => {
        let item = { item: { title: 'title', description: 'desc', category_id: '5' } }
        api.post('/items').type('form').send(item)
            .expect(200, done);

    })

    it('should return a 200 when getting a single record', (done) => {
        api.get('/items/?id=1')
            .expect(200, done);
    })
    it('it should not POST an invalid item empty field', (done) => {
        let item = { item: { title: '', description: 'desc', category_id: '5' } }
        api.post('/items').type('form').send(item)
            .expect(400, done);

    })
    it('it should not POST an invalid item title too long', (done) => {
        let field=''
        for (let i=0;i<256;i++){
            field+='a';
        }
        let item = { item: { title: field, description: 'desc', category_id: '5' } }
        api.post('/items').type('form').send(item)
            .expect(400, done);

    })
    it('it should not POST an invalid item description too long', (done) => {
        let field=''
        for (let i=0;i<5001;i++){
            field+='a';
        }
        let item = { item: { title: 'title', description: field, category_id: '5' } }
        api.post('/items').type('form').send(item)
            .expect(400, done);

    })
    it('it should not POST an invalid item category too large', (done) => {

        let item = { item: { title: 'title', description: 'desc', category_id: '101' } }
        api.post('/items').type('form').send(item)
            .expect(400, done);

    })

    it('it should  POST a valid long item', (done) => {
        let desc=''
        let title=''
        for (let i=0;i<5000;i++){
            if (i<255){
                title+='t';
            }
            desc+='a';
        }

        let item = { item: { title: title, description: desc, category_id: '5' } }
        api.post('/items').type('form').send(item)
            .expect(200, done);

    })

    it('it should not POST with a missing field', (done) => {
        let item = { item: { title: 'title', category_id: '5' } }
        api.post('/items').type('form').send(item)
            .expect(400, done);

    })

    it('it should not POST with an incorrect  field', (done) => {
        let item = { item: { title: 'title',desc:'description', category_id: '5' } }
        api.post('/items').type('form').send(item)
            .expect(400, done);
    })


})