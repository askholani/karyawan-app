const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

dotenv.config({ path: path.join(__dirname, "../env/.env.dev") });
// change format name to camelcase
const toCamelCaseName = (str) => {
  return str.toLowerCase().replace(/_(.)/g, (_, match) => match.toUpperCase());
};

// Define directories
const directories = {
  [toCamelCaseName(
    process.env.PG_NAME
  )]: `../src/infrastructure/models/${toCamelCaseName(process.env.PG_NAME)}`,
  // add more directories in here if needed
};

// Define operatorsAliases
const operatorsAliases = {
  $and: Op.and,
  $or: Op.or,
  $eq: Op.eq,
  $ne: Op.ne,
  $gt: Op.gt,
  $lt: Op.lt,
  $lte: Op.lte,
  $like: Op.like,
  $between: Op.between,
  $not: Op.not,
};

// Define pool configurations
const poolConfigurations = {
  [toCamelCaseName(process.env.PG_NAME)]: {
    min: Number(process.env.PG_POOL_MIN),
    max: Number(process.env.PG_POOL_MAX),
    idle: Number(process.env.PG_POOL_IDLE),
    acquire: Number(process.env.PG_POOL_ACQUIRE),
    evict: Number(process.env.PG_POOL_EVICT),
    handleDisconnects: true,
  },
  // Add other pool configurations as needed
};

// Define sequelize configurations
const sequelizeConfigurations = {
  [toCamelCaseName(process.env.PG_NAME)]: {
    host: process.env.PG_HOST,
    dialect: process.env.PG_DIALECT,
    database: process.env.PG_NAME,
    username: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    pool: poolConfigurations[toCamelCaseName(process.env.PG_NAME)],
    port: Number(process.env.PG_PORT),
    define: {
      timestamps: false,
      timezone: "+07:00",
    },
    logging: Boolean(process.env.PG_LOGGING),
    timezone: "+07:00",
    operatorsAliases: operatorsAliases,
  },
  // Add other sequelize configurations as needed
};

// Initialize sequelize instances
const sequelizeInstances = {};
for (const [key, config] of Object.entries(sequelizeConfigurations)) {
  sequelizeInstances[key] = new Sequelize(config);
}

// Authenticate sequelize instances
const authenticateSequelize = async (instanceName) => {
  try {
    await sequelizeInstances[instanceName].authenticate();
    console.log(`[OK] DB ${instanceName.toUpperCase()} connected!`);
  } catch (error) {
    console.error(
      `[ERR] DB ${instanceName.toUpperCase()} connection error!`,
      error
    );
  }
};

// Authenticate all sequelize instances
for (const instanceName in sequelizeInstances) {
  authenticateSequelize(instanceName);
}

// Initialize db object
const db = {};
let model;

// Define models and associations
const defineModels = (directory, sequelizeInstance) => {
  db[directory] = {};
  fs.readdirSync(path.join(__dirname, directories[directory]))
    .filter((file) => file.indexOf(".") !== 0 && file.indexOf(".map") === -1)
    .forEach((file) => {
      model = require(path.join(__dirname, directories[directory], file))(
        sequelizeInstance,
        Sequelize.DataTypes
      );
      db[directory][model.name] = model;
    });

  Object.keys(db[directory]).forEach((name) => {
    if ("associate" in db[directory][name]) {
      db[directory][name].associate(db[directory]);
    }
  });
};

// Define models and associations for each directory
for (const directory in directories) {
  defineModels(directory, sequelizeInstances[directory]);
}

module.exports = {
  db,
  sequelizeInstances,
};
