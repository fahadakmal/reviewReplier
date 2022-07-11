const app = require('./bin/app');
const config = require("./config/keys.config");


app.listen(config.PORT,()=>console.log(`server is up and running on port ${config.PORT}`))