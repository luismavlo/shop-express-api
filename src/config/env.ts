import 'dotenv/config'
import { get } from 'env-var';


export const envs = {
  PORT: get('PORT').required().asPortNumber(),
  DB_HOST: get('DATABASE_HOST').required().asString(),
  DB_USERNAME: get('DATABASE_USERNAME').required().asString(),
  DB_PASSWORD: get('DATABASE_PASSWORD').required().asString(),
  DB_DATABASE: get('DATABASE_DATABASE').required().asString(),
  DB_PORT: get('DATABASE_PORT').required().asPortNumber(),
  JWT_SEED: get('JWT_SEED').required().asString(),
  MAILER_SERVICE: get('MAILER_SERVICE').required().asString(),
  MAILER_EMAIL: get('MAILER_EMAIL').required().asString(),
  MAILER_SECRET_KEY: get('MAILER_SECRET_KEY').required().asString(),
  WEBSERVICE_URL: get('WEBSERVICE_URL').required().asString(),
  SEND_EMAIL: get('SEND_EMAIL').required().asBool(),

  FIREBASE_API_KEY: get('FIREBASE_API_KEY').required().asString(),
  FIREBASE_PROJECT_ID: get('FIREBASE_PROJECT_ID').required().asString(),
  FIREBASE_STORAGE_BUCKET: get('FIREBASE_STORAGE_BUCKET').required().asString(),
  FIREBASE_APP_ID: get('FIREBASE_APP_ID').required().asString(),
}