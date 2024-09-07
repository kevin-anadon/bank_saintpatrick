import { Sequelize } from "sequelize";

const {
  MYSQL_DATABASE_PROD,
  MYSQL_DATABASE_DEV,
  MYSQL_USER_PROD,
  MYSQL_USER_DEV,
  MYSQL_PASSWORD_PROD,
  MYSQL_PASSWORD_DEV,
  MYSQL_HOST_PROD,
  MYSQL_HOST_DEV,
  MYSQL_PORT_PROD,
  MYSQL_PORT_DEV,
  NODE_ENV,
} = process.env

let database = MYSQL_DATABASE_PROD
let username = MYSQL_USER_PROD
let password = MYSQL_PASSWORD_PROD
let host = MYSQL_HOST_PROD
let port = Number(MYSQL_PORT_PROD)

// TODO: use type NODE_ENV_TYPE = "development" | "test" | "production"

const NODE_ENV_TYPE = {
  DEVELOPMENT: "development",
  TEST: "test",
  PRODUCTION: "production",
}

if (NODE_ENV === NODE_ENV_TYPE.DEVELOPMENT  || NODE_ENV === NODE_ENV_TYPE.TEST) {
  database = MYSQL_DATABASE_DEV
  username = MYSQL_USER_DEV
  password = MYSQL_PASSWORD_DEV
  host = MYSQL_HOST_DEV
  port = Number(MYSQL_PORT_DEV)
}

const sequelize = new Sequelize(
  database, 
  username, 
  password, 
  {
    host,
    port,
    dialect: "mysql",
    logging: false, // Prevents a huge amount of logs
  }
)

const dbConnect = async () => {
  try {
    await sequelize.authenticate()
    console.log("MYSQL connection successful")
    await sequelize.sync()
  } catch (err) {
    throw Error(err)
  }
}

export { sequelize, dbConnect}