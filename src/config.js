
   module.exports = {
    PORT: process.env.PORT || 8000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    CLIENT_ORIGIN: process.env.CLIENT_ORIGIN || "http://localhost:3000",
    DATABASE_URL: process.env.DATABASE_URL || "postgresql://postgres@localhost/christian_karaoke" /*|| "postgresql://postgres@localhost/laissez_fit"*/,
    DATABASE_URL_TEST: "postgres://postgres@localhost/christian_karaoke_test",
 }