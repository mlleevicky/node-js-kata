require('dotenv').config();
const csvParser = require('csv-parser')
const fs = require('fs');
const MongoClient = require('mongodb').MongoClient;
const url = process.env.MONGO_URL + process.env.DATABASE_NAME;

async function emptyDB(dbo){
    try {
        dbo.dropCollection('book');
        dbo.dropCollection('magazine');
        dbo.dropCollection('author')
    }catch (err) {
        console.log(err);
    }
}

// Seed books, magazines and authors from CSV files
function seedDB() {
    MongoClient.connect(url, async function (err, db) {
        if (err) {
            console.log(err)
            throw err;
        }
        const dbo = db.db(process.env.DATABASE_NAME);
        console.log("Database created!");
        await emptyDB(dbo);

        // mapping all collections into promises
        var entities = ['book', 'magazine', 'author'];
        const pEntities = entities.map(async (entity) => {
            return new Promise((resolve, reject) => {
                dbo.createCollection(entity, () => {
                    fs.createReadStream(`./data/${entity}s.csv`)
                        .pipe(csvParser({separator: ';', mapHeaders: ({header, index}) => header.trim()}))
                        .on('data', async (row) => {
                            dbo.collection(entity)
                                .insertOne(row, (err, res) => {
                                    if (err) console.log(err);
                                })
                        })
                        .on('end', () => {
                            resolve();
                            console.log('CSV file successfully processed');
                        })
                        .on('error', (err) => {
                            reject();
                            throw err
                        });
                })
            });
        });

        // closing db connection after seeding all entities
        Promise.all(pEntities).then(() => {
            db.close();
        });
    })
}

seedDB();