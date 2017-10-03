'use latest';
import { MongoClient } from 'mongodb';

const connectDb = (mongoDbUrl) => {

    return new Promise((resolve, reject) => {
        MongoClient.connect(mongoDbUrl, (err, db) => {
            if (err)
                reject(err);
            else {
                resolve(db);
            }
        })
    })
}

module.exports = (context, cb) => {

    connectDb(context.secrets.MONGO_URL)
        .then(db => {
            let newGmail = {
                from: context.data.from,
                name: context.data.name,
                received: context.data.received,
                subject: context.data.subject
            };

            db.collection('gmails').insert(newGmail, (err, result) => {
                console.log('Received and saved new GMail.');
                if (err)
                    cb(null, { result: 'Error on saving gmail.' });
                cb(null, { result: 'Ok' });
            })
        })
        .catch(() => {
            cb(null, { result: 'DB Connection Error.' });
        })
};