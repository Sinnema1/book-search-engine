import db from "../config/connection.js";
import user from "../models/index.js";
import cleanDB from "./cleanDB.js";

const { User } = user;

import techData from './techData.json' assert { type: "json" };

db.once('open', async () => {
  await cleanDB('User', 'teches');

  await User.insertMany(techData);

  console.log('Technologies seeded!');
  process.exit(0);
});
