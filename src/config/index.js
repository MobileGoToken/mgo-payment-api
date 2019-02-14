require('dotenv').config();

const {
  DB_HOST,
  DB_PORT,
  DB_NAME,
  DB_USER,
  DB_PASS,
  DB_DEBUG,

  NODE_ENV,
  NODE_PORT,

  ETHEREUM_RPC,
  // ABI_FILE_URL,
  TOKEN_ADDRESS,
  TOKEN_DECIMALS,

  KEYFILE_PATH,
  KEYFILE_PASS,
} = process.env;


// TODO: import another abi if path is given
const abi = require('./abi.json');

module.exports = {
  nodeEnv: NODE_ENV,
  nodePort: NODE_PORT,

  eth: {
    rpc: ETHEREUM_RPC,
    token: {
      abi,
      address: TOKEN_ADDRESS,
      decimals: TOKEN_DECIMALS,
    },
    account: {
      keyfile: KEYFILE_PATH,
      password: KEYFILE_PASS,
    },
    net: {
      options: {
        transactionBlockTimeout: 10,
      },
    },
  },

  sequelizeOptions: {
    host: DB_HOST,
    port: DB_PORT,
    dialect: 'postgres',
    logging: (DB_DEBUG === 'true'),
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
  // needed for sequelize migrations
  [NODE_ENV]: {
    username: DB_USER,
    password: DB_PASS,
    database: DB_NAME,
    host: DB_HOST,
    dialect: 'postgres',
  },
};
