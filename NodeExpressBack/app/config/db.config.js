module.exports = {
    HOST: "ec2-63-32-7-190.eu-west-1.compute.amazonaws.com",
    PORT : 5432,
    USER: "gxugbenthkdabm",
    PASSWORD: "e3ee7fe92e2fc3672bb628d7ec6402da5650ac8630d6cb060240ec95ba1ce8e1",
    DB: "d63l8l0a8t50uq",
    dialect: "postgres",
    SSL: true,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};