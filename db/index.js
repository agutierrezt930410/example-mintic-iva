import mongonse from "mongoose";
import fs from "fs";
import path from "path";

export const dbWrapper = fs
  .readdirSync(path.join(process.cwd(), "db", "models"))
  .reduce(async (acc, file) => {
    const model = await import(path.join(process.cwd(), "db", "models", file));
    const name = new model.default({}).constructor.modelName;
    acc[name] = model.default;
    return acc;
  }, {});

export default (url) => {
  return mongonse.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
};
