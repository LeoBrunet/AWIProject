module.exports = {
    HOST: "postgresql-nicolas-ig.alwaysdata.net",
    PORT : 5432,
    USER: "nicolas-ig",
    PASSWORD: "gikcok-tasCih-9zepwu",
    DB: "nicolas-ig_awi",
    dialect: "postgres",
    SSL: true,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};