const fs = require("fs");
const path = require("path");
const yargs = require("yargs");
const _ = require("lodash");
const PATH_MODULES = path.join(__dirname, "modules");
const PATH_SERVICES = path.join(__dirname, "services");
const prettier = require("prettier");
const pluralize = require("pluralize");

const argv = yargs
  .command("module", "Generate new folder modules", {
    name: {
      description: "Name of the module",
      alias: "n",
      type: "string",
      demandOption: true,
    },
  })
  .command("service", "Generate new folder services", {
    name: {
      description: "Name of the service",
      alias: "n",
      type: "string",
      demandOption: true,
    },
  })
  .command("reRouter", "Regenerate router")
  .command("init", "Init project", {
    database_url: {
      description: "Database URL",
      alias: "d",
      type: "string",
      demandOption: true,
    },
  })
  .help()
  .alias("help", "h").argv;

function convertStartCamelCase(input) {
  return _.startCase(_.camelCase(input)).replace(/ /g, "");
}

const writeRouter = async () => {
  // router
  const folderModulesList = fs
    .readdirSync(PATH_MODULES)
    .filter((thisFolder) => !thisFolder.startsWith("."));

  const folderServicesList = fs
    .readdirSync(PATH_SERVICES)
    .filter((thisFolder) => !thisFolder.startsWith("."));

  const templateRouter = `
    const express = require("express");
    const router = express.Router();

    ${folderModulesList
      .map((thisFolder) => {
        return `const route${convertStartCamelCase(
          thisFolder
        )} = require("../modules/${thisFolder}/${thisFolder}.route");`;
      })
      .join("\n")}

    ${folderServicesList
      .map((thisFolder) => {
        return `const route${convertStartCamelCase(thisFolder)} = require("../services/${thisFolder}/${thisFolder}.route");`;
      })
      .join("\n")}

    ${folderModulesList
      .map((thisFolder) => {
        return `router.use("/${thisFolder}", route${convertStartCamelCase(
          thisFolder
        )});`;
      })
      .join("\n")}

    ${folderServicesList
      .map((thisFolder) => {
        return `router.use("/service/${thisFolder}", route${convertStartCamelCase(thisFolder)});`;
      })
      .join("\n")}

    module.exports = router;
`;
  const formattedTemplateRouter = await prettier.format(templateRouter, {
    parser: "babel",
  });
  fs.writeFileSync(`${__dirname}/router/router.js`, formattedTemplateRouter);
};

const generateFolder = ({ name }) => {
  try {
    const folderPath = argv._.includes("module") ? PATH_MODULES : PATH_SERVICES;
    const checkFolder = fs.existsSync(`${folderPath}/${name}`);
    if (!checkFolder) {
      fs.mkdirSync(`${folderPath}/${name}`);
    }
  } catch (error) {
    console.log("generate folder error", error);
  }
};

const generateModuleCRUDFile = async ({ name }) => {
  try {
    // controller
    const templateController = `
      const mongoose = require("mongoose");
      const ${convertStartCamelCase(name)} = require("./${name}.model");

      const get = async (req, res, next) => {
        try {
          const query = req.query

          const ${pluralize(name)} = await ${convertStartCamelCase(name)}.find({
            ...query.filter,
          })
            .select(query.select)
            .sort(query.sort)
            .limit(query.limit)
            .skip(query.skip)
            .populate(query.populate)
            .lean({ virtuals: true });
          const count = await ${convertStartCamelCase(name)}.countDocuments(query.filter)
          return res.status(200).json({
            type: "S",
            message: "Get Success",
            ${pluralize(name)},
            count,
          });
        } catch (error) {
          console.log("get ${name} error", error);
          next(error);
        }
      }

      const getById = async (req, res, next) => {
        try {
          const { id } = req.params
          const query = req.query
          const ${name} = await ${convertStartCamelCase(name)}.findById(id)
            .populate(query.populate)
            .lean({ virtuals: true });
            return res.status(200).json({
              type: "S",
              message: "Get Id Success",
              ${name},
          });
        } catch (error) {
            console.log("get ${name} by id error", error);
            next(error);
        }
      } 

      const getOne = async (req, res, next) => {
        try {
          const query = req.query
          const ${name} = await ${convertStartCamelCase(name)}.findOne({
            ...query.filter,
          })
            .select(query.select)
            .sort(query.sort)
            .limit(query.limit)
            .skip(query.skip)
            .populate(query.populate)
            .lean({ virtuals: true });
          return res.status(200).json({
            type: "S",
            message: "Get One Success",
            ${name},
          });
        } catch (error) {
          console.log("get one ${name} error", error);
          next(error);
        }
      }

      const create = async (req, res, next) => {
        try {
          const data = req.body
          const ${name} = new ${convertStartCamelCase(name)}(data)
          await ${name}.save()
          return res.status(201).json({
            type: "S",
            _id: ${name}._id,
            message: "Create Success",
          });
        } catch (error) {
          console.log("create ${name} error", error);
          next(error);
        }
      }

      const createMany = async (req, res, next) => {
        try {
          const data = req.body
          const ${pluralize(name)} = await ${convertStartCamelCase(
            name
          )}.insertMany(data.${pluralize(name)})
          return res.status(201).json({
            type: "S",
            message: "Create Many Success",
            ${pluralize(name)},
          });
        } catch (error) {
          console.log("create many ${name} error", error);
          next(error);
        }
      }

      const update = async (req, res, next) => {
        try {
          const data = req.body
          const { id } = req.params
          await ${convertStartCamelCase(name)}.findOneAndUpdate({
            _id: id,
          }, data)
          return res.status(200).json({
             type: "S",
             message: "Update Success",
          });
        } catch (error) {
            console.log("update ${name} error", error);
            next(error);
        }  
      }

      const remove = async (req, res, next) => {
        try {
            const { id } = req.params
            await ${convertStartCamelCase(name)}.findByIdAndDelete(id)
            return res.status(200).json({
                type: "S",
                message: "Remove Success",
            });
        } catch (error) {
            console.log("remove ${name} error", error);
            next(error);
        }
      }

      const count = async (req, res, next) => {
        try {
          const query = req.query
          const count = await ${convertStartCamelCase(name)}.countDocuments(query.filter)
          return res.status(200).json({
            type: "S",
            message: "Count Success",
            count,
          });
        } catch (error) {
          console.log("count ${name} error", error);
          next(error);
        }
      }

      const distinct = (req, res, next) => {
        try {
          const { filter } = req.query
          const ${pluralize(name)} = ${convertStartCamelCase(name)}.distinct(filter?.field)
          return res.status(200).json({
            type: "S",
            message: "Distinct Success",
            ${pluralize(name)},
          });
        } catch (error) {
          console.log("distinct ${name} error", error);
          next(error
          );
        }  
      }

      module.exports = {
        get,
        getById,
        getOne,
        create,
        createMany,
        update,
        remove,
        count,
        distinct,
      }
    `;
    const formattedTemplateController = await prettier.format(
      templateController,
      {
        parser: "babel",
      }
    );
    fs.writeFileSync(
      `${PATH_MODULES}/${name}/${name}.controller.js`,
      formattedTemplateController
    );

    // model
    const templateModel = `
      const mongoose = require("mongoose");
      const { timestampPlugin } = require("../../plugins/time.plugin");
      const mongooseLeanVirtuals = require('mongoose-lean-virtuals');

      const ${convertStartCamelCase(name)}Schema = new mongoose.Schema({
      });

      ${convertStartCamelCase(name)}Schema.plugin(timestampPlugin);
      ${convertStartCamelCase(name)}Schema.plugin(mongooseLeanVirtuals);
      const ${convertStartCamelCase(name)} = mongoose.model("${name}", ${convertStartCamelCase(
        name
      )}Schema, "${name}");
      /** @type {import('mongoose').Model} */
      module.exports = ${convertStartCamelCase(name)};
    `;
    const formattedTemplateModel = await prettier.format(templateModel, {
      parser: "babel",
    });
    fs.writeFileSync(
      `${PATH_MODULES}/${name}/${name}.model.js`,
      formattedTemplateModel
    );

    // route
    const templateRoute = `
      const express = require("express");
      const router = express.Router();
      const ${name}Controller = require("./${name}.controller");

      // GET
      router.get("/", ${name}Controller.get);
      router.get("/distinct", ${name}Controller.distinct);
      router.get("/count", ${name}Controller.count);
      router.get("/one", ${name}Controller.getOne);
      router.get("/:id", ${name}Controller.getById);

      // POST  
      router.post("/", ${name}Controller.create);
      router.post("/many", ${name}Controller.createMany);

      // PUT
      router.put("/:id", ${name}Controller.update);

      // DELETE
      router.delete("/:id", ${name}Controller.remove);
      
      module.exports = router;
    `;
    const formattedTemplateRoute = await prettier.format(templateRoute, {
      parser: "babel",
    });
    fs.writeFileSync(
      `${PATH_MODULES}/${name}/${name}.route.js`,
      formattedTemplateRoute
    );

    // router
    await writeRouter();
  } catch (error) {
    console.log("generate file error", error);
  }
};

const generateService = async ({ name }) => {
  // controller
  const serviceController = `
    const mongoose = require("mongoose");

    const ${name} = async (req, res, next) => {
        try {
          const query = req.query
          const shouldReturn = query?.shouldReturn || true;

          if (!shouldReturn) {
            return {
            }
          }
        
          return res.status(200).json({
            type: "S",
            message: "Get Success",
          });
        } catch (error) {
          console.log("get ${name} error", error);
          next(error);
      }
    }

    module.exports = {
      ${name},
    };
  `;

  // route service
  const serviceRoute = `
    const express = require("express");
    const router = express.Router();

    const ${name}Controller = require("./${name}.controller");

    router.get("/", ${name}Controller.${name});

    module.exports = router;
  `;

  await generateFolder({ name });

  const formattedTemplateController = await prettier.format(serviceController, {
    parser: "babel",
  });
  fs.writeFileSync(
    `${PATH_SERVICES}/${name}/${name}.controller.js`,
    formattedTemplateController
  );

  const formattedTemplateRoute = await prettier.format(serviceRoute, {
    parser: "babel",
  });
  fs.writeFileSync(
    `${PATH_SERVICES}/${name}/${name}.route.js`,
    formattedTemplateRoute
  );

  // router
  await writeRouter();
};

const generateInit = async ({ database_url }) => {
  try {
    const initFolders = [
      // CONSTRANT
      {
        folder_name: "constrant",
        files: [
          {
            file_name: "general.con.js",
            content: `
          module.exports = { };
        `,
          },
        ],
      },
      // CONFIG
      {
        folder_name: "config",
        files: [
          {
            file_name: "stripe.config.js",
            content: `
          const STRIPE_SECRET_KEY =
            process.env.STRIPE_SECRET_KEY ||
            "";

          module.exports = {
            STRIPE_SECRET_KEY,
          };
        `,
          },
        ],
      },
      // DATABASE
      {
        folder_name: "database",
        files: [
          {
            file_name: "connect.database.js",
            content: `
          const mongoose = require("mongoose");
          const url = "${database_url}";
          let connection;
          const connectDB = async () => {
            try {
              connection = await mongoose.connect(url, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
              });

              console.log("MongoDB Connected...");

              return connection;
            } catch (e) {
              console.error("Could not connect to MongoDB...");
              throw e;
            }
          };
          module.exports = { connectDB };
        `,
          },
        ],
      },
      // MIDDLEWARE
      {
        folder_name: "middleware",
        files: [
          {
            file_name: "auth.middleware.js",
            content: `
          const jwt = require("jsonwebtoken");
          const { secret } = require("../constrant/general.con");

          const verifyToken = async (req, res, next) => {
            try {
              const token = req.header("Authorization").replace("Bearer ", "");
              const decoded = jwt.verify(token, secret);
              req.user = decoded;
              next();
            } catch (error) {
              console.log("verifyToken error", error);
              res.status(401).send({ error: "Please authenticate" });
            }
          };

          module.exports = { verifyToken };
        `,
          },
        ],
      },
      // MODULES
      {
        folder_name: "modules",
        files: [],
      },
      // SERVICES
      {
        folder_name: "services",
        files: [],
      },
      // PLUGINS
      {
        folder_name: "plugins",
        files: [
          {
            file_name: "time.plugin.js",
            content: `
          const util = require("../utils/time.util");
          const timestampPlugin = function (schema) {
          schema.add({
            createdAt: {
              type: String,
              default: "",
            },
            updatedAt: {
              type: String,
              default: "",
            },
          });
            schema.pre("save", function (next) {
              const currentISO = util.currentISO();
              if (!this.createdAt) {
                this.createdAt = currentISO;
              }
              this.updatedAt = currentISO;
              next();
            });
          };
        module.exports = {
          timestampPlugin,
        };
        `,
          },
        ],
      },
      // ROUTER
      {
        folder_name: "router",
        files: [
          {
            file_name: "router.js",
            content: `
          const express = require("express");
          const router = express.Router();

          module.exports = router;
        `,
          },
        ],
      },
      // UTILS
      {
        folder_name: "utils",
        files: [
          {
            file_name: "time.util.js",
            content: `
         const { DateTime } = require("luxon");
          const currentISO = () => DateTime.now().setZone("UTC+7").toISO();
          const toISO = (date) => DateTime.fromISO(date).setZone("UTC+7").toISO();
          const toYMD = (date, days) => {
            if (date) {
              if (days) {
                return DateTime.fromISO(date)
                  .setZone("UTC+7")
                  .plus({ days })
                  .toFormat("yyyy-MM-dd");
              }

              return DateTime.fromISO(date).setZone("UTC+7").toFormat("yyyy-MM-dd");
            }

            if (days) {
              return DateTime.now()
                .setZone("UTC+7")
                .plus({ days })
                .toFormat("yyyy-MM-dd");
            }

            return DateTime.now().setZone("UTC+7").toFormat("yyyy-MM-dd");
          };
          function leapYear(year) {
            return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
          }

          const diffTimeHour = (myDate) => {
            // Step 1: Convert myDate string to a Date object
            const myDateObject = new Date(myDate);

            // Step 2: Calculate the time difference in milliseconds
            const timeDifferenceMs = new Date() - myDateObject;

            // Step 3: Convert time difference from milliseconds to hours
            const timeDifferenceHours = timeDifferenceMs / (1000 * 60 * 60);

            return timeDifferenceHours;
          };
          module.exports = {
            toYMD,
            currentISO,
            toISO,
            diffTimeHour,
          };
        `,
          },
          {
            file_name: "general.util.js",
            content: `
            const bcryptjs = require("bcryptjs");
            const jwt = require("jsonwebtoken");
            // Hashing password
            const hashPassword = async (password) => {
              const saltRounds = 10; // Number of salt rounds to use for hashing
              const hashedPassword = await bcryptjs.hash(password, saltRounds);
              return hashedPassword;
            };

            const generateToken = async (data) => {
              const token = jwt.sign(data, process.env.JWT_SECRET, {
                expiresIn: "7d",
              });
              return token;
            };

            module.exports = {
              hashPassword,
              generateToken,
            };
            `,
          },
        ],
      },
    ];

    const app = `
        const express = require("express");
        const bodyParser = require("body-parser");
        const awsServerlessExpressMiddleware = require("aws-serverless-express/middleware");
        const { connectDB } = require("./database/connect.database");
        const router = require("./router/router");
        const cors = require("cors");
        const queryString = require("query-string");
        const axios = require("axios");
        require("dotenv").config();

        // declare a new express app
        const app = express();
        app.use(cors({ origin: "*" }));
        app.use(
          express.json({
            limit: "50mb",
          })
        );
        app.use(express.urlencoded());

      if (process?.env?.NODE_ENV === "production") {
        app.use(awsServerlessExpressMiddleware.eventContext());
      }

      // Enable CORS for all methods
      app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "*");
        res.header("Access-Control-Allow-Methods", "*");
        next();
      });

      app.use(async (req, res, next) => {
        const defaultQuery = {
          limit: 100,
          skip: 0,
          sort: {},
          filter: {},
          select: "",
          populate: [],
          ...req?.query,
        };

        req.query = defaultQuery;
        next();
      });

      app.use("/api", router);
      app.use((err, req, res, next) => {
        try {
          console.log("ERROR", err);
          axios({
            method: "post",
            url: "https://notify-api.line.me/api/notify",
            headers: {
              Authorization:
                "Bearer " + "IuJHNTYH0gOVjANgCBT3MltAKTL0MO4OepCGHp8tECL",
              "Content-Type": "application/x-www-form-urlencoded",
              "Access-Control-Allow-Origin": "*",
            },
            data: queryString.stringify({
              message: err?.message,
            }),
          });
          res.status(500).json({
            message: err?.message,
            status: 500,
          });
        } catch (error) {
          console.log("middleware error", error);
        }
      });
      connectDB();
      app.listen(1337, function () {
        console.log("App started");
      });
      module.exports = app;
    `;
    const packagejson = `
      {
      "name": "dashboard",
      "version": "1.0.0",
      "description": "Lambda function generated by Amplify",
      "main": "index.js",
      "license": "Apache-2.0",
      "scripts": {
        "start": "nodemon app.js",
        "generate": "node generate.js"
      },
      "dependencies": {
        "@aws-sdk/credential-provider-sso": "^3.616.0",
        "@aws-sdk/credential-providers": "^3.617.0",
        "aws-sdk": "^2.1662.0",
        "aws-serverless-express": "^3.3.5",
        "axios": "1.7.7",
        "bcryptjs": "^2.4.3",
        "body-parser": "^1.17.1",
        "cors": "^2.8.5",
        "dotenv": "^16.4.5",
        "express": "^4.15.2",
        "jsonwebtoken": "^9.0.2",
        "lodash": "^4.17.21",
        "luxon": "^3.5.0",
        "mongodb": "6.9.0",
        "mongoose": "7.5.1",
        "nodemon": "^3.0.1",
        "pluralize": "^8.0.0",
        "prettier": "^3.3.2",
        "qs": "^6.11.2",
        "query-string": "7.1.1",
        "yargs": "^17.7.2",
        "mongoose-lean-virtuals": "^0.9.1",
      },
      "devDependencies": {
        "@types/aws-lambda": "^8.10.92"
      }
    }
    `;

    const formattedApp = await prettier.format(app, {
      parser: "babel",
    });
    const formattedPackageJson = await prettier.format(packagejson, {
      parser: "json",
    });
    fs.writeFileSync(`${__dirname}/app.js`, formattedApp);
    fs.writeFileSync(`${__dirname}/package.json`, formattedPackageJson);
    initFolders.forEach((folder) => {
      if (!fs.existsSync(`${__dirname}/${folder.folder_name}`)) {
        fs.mkdirSync(`${__dirname}/${folder.folder_name}`);
      }
      if (!folder.files.length) {
        return;
      }
      folder.files.forEach(async (file) => {
        const formattedFile = await prettier.format(file.content, {
          parser: "babel",
        });
        fs.writeFileSync(
          `${__dirname}/${folder.folder_name}/${file.file_name}`,
          formattedFile
        );
      });
    });
  } catch (error) {
    console.log("generate folder error", error);
  }
};

console.log("start generate", argv?._);
if (argv._.includes("module")) {
  console.log("module", argv?.name);
  generateFolder({ name: argv?.name });
  generateModuleCRUDFile({ name: argv?.name });
} else if (argv._.includes("service")) {
  console.log("service", argv?.name);
  generateService({ name: argv?.name });
} else if (argv._.includes("reRouter")) {
  console.log("reRouter");
  writeRouter();
} else if (argv._.includes("init")) {
  console.log("init");
  generateInit({ database_url: argv?.database_url });
}

console.log("end generate");
