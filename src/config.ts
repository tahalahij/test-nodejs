import dotenv from "dotenv";

dotenv.config();

interface MongoDB {
    hostname: string;
    databaseName: string;
    userName: string;
    password: string;
    replicaSet: string;
}

interface Config {
    developerMode: boolean;
    port: number;
    mongodb: MongoDB;
    corsOrigins: string[];
}

const checkEnv = (envVar: string, defaultValue?: any) => {
    if (process.env[envVar] === undefined) {
        // env is not set
        if (defaultValue !== undefined) {
            // if env variable  has a default value, use that
            return defaultValue;
        }
        throw new Error(`Please define the Environment variable"${envVar}"`);
    } else {
        return process.env[envVar] as string;
    }
};
const config: Config = {
    developerMode: checkEnv("NODE_ENV", 'develop') === 'develop',
    port: parseInt(checkEnv("PORT"), 10),
    mongodb: {
        hostname: checkEnv('MONGODB_HOST_NAME'),
        databaseName: checkEnv('MONGODB_DATABASE_NAME'),
        userName: checkEnv('MONGODB_USER_NAME'),
        password: checkEnv('MONGODB_PASSWORD'),
        replicaSet: checkEnv('MONGODB_REPLICA_SET'),
    },
    corsOrigins: (checkEnv('CORS_ORIGINS', "http://localhost:3000")).split(','),
}
export default config;
