require('dotenv').config();
const app = require('./app');
const { expect } = require('chai');
const request = require('supertest')(process.env.APP_URL);
const mongoHelpers = require('./helpers/mongo');

describe('test graphQL', () => {
    it('Returns book with isbn = 5554-5545-4518', (done) => {
        request.post('/graphql')
            .send({ query: '{ book(field: "isbn", value: "5554-5545-4518") { title isbn authors description } }'})
            .expect(200)
            .end((err,res) => {
                // res will contain array with one book
                if (err) return done(err);
                res.body.data.book.hasOwnProperty('title');
                res.body.data.book.hasOwnProperty('isbn');
                res.body.data.book.hasOwnProperty('authors');
                res.body.data.book.hasOwnProperty('description');
                done();
            })
    });

    it('Returns all books', (done) => {
        request.post('/graphql')
            .send({ query: '{ books { title isbn authors description } }' })
            .expect(200)
            .end((err, res) => {;
                // res will contain array of all books
                if (err) return done(err);
                // 8 books from csv
                expect(res.body.data.books).to.be.an('array');
                expect(res.body.data.books).to.have.lengthOf(8);
                done();
            })
    })
});

describe("test mongo", () => {
    it('Returns magazine with isbn = 5454-5587-3210', async () => {
        const result = await mongoHelpers.getEntity({field: "isbn",  value: "5454-5587-3210"}, "magazine");
        expect(result).to.be.an('object');
        expect(result.title).to.equal('Beautiful cooking');
        expect(result.isbn).to.equal('5454-5587-3210');
        expect(result.authors).to.equal('null-walter@echocat.org');
        expect(result.publishedAt).to.equal('21.05.2011');
    });

    it('Returns all magazines', async () => {
        const result = await mongoHelpers.getEntities({}, "magazine");
        expect(result).to.be.an('array');
        expect(result).to.have.lengthOf(6);
    });
});