export interface IGeneralConfiguration {
    port: number;
    url: string;
    jwtConstants: IJwtConstants;
    credentials: IUserCredentials,
}

export interface IJwtConstants { 
    secret: string;
    expiration: number;
    salt: number;
}

export interface IUserCredentials {
    user: string,
    password: string,
}