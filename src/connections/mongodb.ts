import mongoose from 'mongoose';
import config from '../config';
import { logger } from '../utils';
import { LOG_LABELS } from '../constants/enums';

const {
    userName,
    password,
    hostname,
    databaseName,
    replicaSet,
} = config.mongodb;

let connectionString: string;

if (userName && password) {
    connectionString = `mongodb://${userName}:${password}@${hostname}/${databaseName}`;
} else {
    connectionString = `mongodb://${hostname}/${databaseName}`;
}

try {
    mongoose.connect(connectionString, {
        connectTimeoutMS: 4000,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
        replicaSet,
    });
} catch (error) {
    logger.error(
        LOG_LABELS.MONGODB_CONNECTION,
        'Mongodb Connection Error: ',
        error
    );
}

mongoose.connection.on('connected', () => {
    logger.debug(
        LOG_LABELS.MONGODB_CONNECTION,
        'Mongodb Connection was Successful ');
});

mongoose.connection.on('error', (error) => {
    logger.error(LOG_LABELS.MONGODB_CONNECTION, 'Connection Error: ', error);
    throw new Error(`unable to connect to mongo db: ${connectionString}`);
});

export default mongoose;
