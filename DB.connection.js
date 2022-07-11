const mongoose = require("mongoose");

module.exports = (DB) => {
  // console.log(`mongodb+srv://${DB.username}:${DB.password}@${DB.DB_name}?retryWrites=true&w=majority`)
  mongoose
    .connect(
      `mongodb+srv://${DB.username}:${DB.password}@${DB.DB_name}?retryWrites=true&w=majority`,
      // `mongodb+srv://${DB.username}:${DB.password}@${DB.DB_name}?retryWrites=true&w=majority`,
      // 'mongodb://admin:htptptht@cluster0-shard-00-00.rc4p0.mongodb.net:27017,cluster0-shard-00-01.rc4p0.mongodb.net:27017,cluster0-shard-00-02.rc4p0.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-lnr003-shard-0&authSource=admin&retryWrites=true&w=majority',
      // 'mongodb://admin:admin123@thetraditionals-shard-00-00.xqoes.mongodb.net:27017,thetraditionals-shard-00-01.xqoes.mongodb.net:27017,thetraditionals-shard-00-02.xqoes.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-ls3bdb-shard-0&authSource=admin&retryWrites=true&w=majority',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
      }
    )
    .then(() => console.log("DB Connected"))
    .catch((err) => console.log(err));
};


// mongodb+srv://admin:<password>@cluster0.rc4p0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority