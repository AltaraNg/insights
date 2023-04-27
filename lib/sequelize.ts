import { Sequelize } from "sequelize";
import mysql2 from 'mysql2';

// Create Sequelize instance and connect to MySQL
const sequelize = new Sequelize(process.env.SQL_DATABASE!, process.env.SQL_USER!, process.env.SQL_PASSWORD, {
    host: process.env.SQL_HOST,
    dialect: "mysql",
    dialectModule: mysql2,
});

(async () => {
    try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully.");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
})();

export { sequelize };
