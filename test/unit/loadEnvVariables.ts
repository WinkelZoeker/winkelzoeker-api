import * as dotenv from "dotenv-extended";

const envPath = `${__dirname}/.${process.env.DEFAULT_ENVIRONMENT}.env`;

dotenv.load({
  path: envPath
});
