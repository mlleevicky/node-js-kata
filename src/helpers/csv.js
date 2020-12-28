const csvParser = require('csv-parser')
const fs = require('fs');

const csv = {

    // trim headers : Problem lib csv-parser separator
    // Get entities from CSV with optional filter
    getEntities: function(args, entity) {
        var results = [];
        return new Promise((resolve, reject) => {
            fs.createReadStream(`./data/${entity}s.csv`)
                .pipe(csvParser({ separator: ';' , mapHeaders: ({ header, index }) => header.trim()}))
                .on('data', (row) => {
                    if (args.field && args.value !== null) {
                        if (row[args.field] == args.value) {
                            results.push(row);
                        }
                    } else {
                        results.push(row)
                    }
                })
                .on('end', () => {
                    resolve(results);
                })
                .on('error', () => reject("error"));
        });
    },

    // Get entity from CSV with optional filter
    getEntity: function(args, entity) {
        return new Promise((resolve,reject) => {
            fs.createReadStream(`./data/${entity}s.csv`)
                .pipe(csvParser({ separator: ';' , mapHeaders: ({ header, index }) => header.trim()}))
                .on('data', (row) => {
                    if (row[args.field] == args.value){
                        resolve(row);
                    }
                })
                .on('end', () => {
                    console.log('CSV file successfully processed');
                    reject(null);
                })
                .on('error', () => reject("error"));
        });
    }
};

module.exports = csv;