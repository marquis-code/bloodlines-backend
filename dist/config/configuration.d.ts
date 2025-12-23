declare const _default: () => {
    nodeEnv: string;
    port: number;
    database: {
        uri: string;
    };
    jwt: {
        secret: string;
        expiresIn: string;
        refreshSecret: string;
        refreshExpiresIn: string;
    };
    email: {
        host: string;
        port: number;
        user: string;
        password: string;
        from: string;
    };
    axios: {
        timeout: number;
        maxRedirects: number;
        baseURL: string;
    };
    cors: {
        origin: string;
    };
    app: {
        url: string;
        port: number;
        name: string;
        version: string;
        apiPrefix: string;
    };
};
export default _default;
