import chalk from "chalk";
import { connect } from "mongoose";

import { NODE_ENV, MONGO_URI, ATLAS_URI } from "../env/env.service.js";

export const connectToDb = async () => {
  const uri = NODE_ENV === "dev" ? MONGO_URI : ATLAS_URI;
  const loc = uri === MONGO_URI ? "Local" : "Atlas";

  await connect(uri)
    .then(() => console.log(chalk.magenta(`connected to MongoDb ${loc}!`)))
    .catch((error) =>
      console.log(chalk.red(`could not connect to mongoDb: ${error}`))
    );
};
