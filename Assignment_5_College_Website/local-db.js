const fs = require('fs');
const path = require('path');

class LocalDB {
    constructor(dbName) {
        this.dbPath = path.join(process.cwd(), `${dbName}.json`);
        if (!fs.existsSync(this.dbPath)) {
            fs.writeFileSync(this.dbPath, JSON.stringify([]));
        }
    }

    async read() {
        const data = fs.readFileSync(this.dbPath, 'utf8');
        return JSON.parse(data);
    }

    async write(data) {
        fs.writeFileSync(this.dbPath, JSON.stringify(data, null, 2));
    }

    async find(query = {}) {
        let data = await this.read();
        // Simple filtering for query (e.g., { status: 'Pending' })
        return data.filter(item => {
            return Object.keys(query).every(key => item[key] === query[key]);
        });
    }

    async save(doc) {
        let data = await this.read();
        const newDoc = { ...doc, _id: Date.now().toString(), createdAt: new Date() };
        data.push(newDoc);
        await this.write(data);
        return newDoc;
    }

    async findByIdAndUpdate(id, update, options = {}) {
        let data = await this.read();
        const index = data.findIndex(item => item._id === id);
        if (index === -1) return null;
        
        data[index] = { ...data[index], ...update };
        await this.write(data);
        return data[index];
    }
}

const schemas = {};

const mongooseMock = {
    Schema: class {
        constructor(definition) {
            this.definition = definition;
        }
    },
    model: (name, schema) => {
        const db = new LocalDB(name.toLowerCase());
        
        // Return a class that mimics Mongoose model
        return class Model {
            constructor(data) {
                this.data = data;
            }

            static find(query) {
                const promise = db.find(query);
                
                // Create a chainable/thenable object
                const queryObj = {
                    sort: function() { return this; },
                    then: function(resolve, reject) {
                        return promise.then(resolve, reject);
                    }
                };
                return queryObj;
            }

            static async findByIdAndUpdate(id, update) {
                return await db.findByIdAndUpdate(id, update);
            }

            async save() {
                return await db.save(this.data);
            }
        };
    },
    connect: async () => {
        console.log('Connected to Local JSON Database.');
        return true;
    }
};

module.exports = mongooseMock;
