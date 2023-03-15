export const JwtConstants = {
    secret: process.env.SECRET_KEY,
    expiration: process.env.JWT_EXPIRATION,
    salt: process.env.SALT_ROUND,
};
