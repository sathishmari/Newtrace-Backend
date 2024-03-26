const throwIfUndefined = (env: string): string => {
    if (!process.env[env]) {
        throw new Error(`Environment variable "${env}" is required.`);
    }
    return process.env[env] || "";
};

interface EnvironmentVariables {
    env: string;
    aws: {
        accessKey: string;
        secretKey: string;
        region: string;
        dbPrefix: string;
        bucketName: string;
        bucketUrl: string;
    };
}

const variables: EnvironmentVariables = {
    env: throwIfUndefined("NODE_ENV"),
    aws: {
        accessKey: throwIfUndefined("DB_AWS_ACCESS_KEY"),
        secretKey: throwIfUndefined("DB_AWS_SECRET_KEY"),
        region: throwIfUndefined("DB_AWS_REGION"),
        dbPrefix: throwIfUndefined("DB_PREFIX"),
        bucketName: throwIfUndefined("BUCKET_NAME"),
        bucketUrl: throwIfUndefined("BUCKET_URL")
    }
};

export default variables;