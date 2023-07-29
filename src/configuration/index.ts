import * as dotenv from "dotenv";
dotenv.config();

const { 
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_DATABASE,
  MYSQL_USER,
  MYSQL_PASSWORD,
  MYSQL_CHARSET ,
  CLEAN_NEST_MONGO_CONNECTION_STRING,
  APP_PORT,
  CONTENT_WELCOME_MESSAGE_CONTENT_ID,
  CONTENT_DEFAULT_RESPONSE_CONTENT_ID,
  TELEGRAM_TOKEN_BOT,
} = process.env

export const DATA_BASE_CONFIGURATION = {
  mongoConnectionString: CLEAN_NEST_MONGO_CONNECTION_STRING as string,
  // mongoConnectionString: 'mongodb://localhost:27017',
};

export const MYSQL_CONFIGURATION = {
  user: MYSQL_USER,
  pass: MYSQL_PASSWORD,
  host: MYSQL_HOST,
  database: MYSQL_DATABASE,
  port: Number(MYSQL_PORT),
  charset: MYSQL_CHARSET,
};

export const APP = {
  port: APP_PORT
};

export const CONTENT = {
  welcomeMessageContentId: CONTENT_WELCOME_MESSAGE_CONTENT_ID,
  defaultResponseContentId: CONTENT_DEFAULT_RESPONSE_CONTENT_ID,
};

export const TELEGRAM = {
  token: TELEGRAM_TOKEN_BOT,
};
