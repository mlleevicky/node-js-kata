const dbContext = require("../database/database");

const mongo = {
    // Get entity from database with optional filter
    getEntity: function(args, entity) {
        return dbContext().then(db => db.collection(entity).findOne({ [args.field]: args.value }));
    },

    // Get entities from database with optional filter
    getEntities: function(args, entity) {
        let filter = {};
        if (args.field && args.value) {
            filter = {[args.field]: args.value}
        }
        return dbContext().then(db => db.collection(entity).find(filter).toArray());
    }
};

module.exports = mongo;