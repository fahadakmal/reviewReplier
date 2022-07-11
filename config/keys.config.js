const fs = require("fs");
module.exports = {
  PORT: process.env.PORT || 5000,
  admin: {
    super:
      process.env.SUPER_ADMIN_KEY ||
      "ashkdukahk@*ASD&(*ASD*Nd88#ADF.&*A(234(**(@H8998kjacsbcqi322347.,2sa-==I*#&)!989298kjcbe28",
    admin: process.env.ADMIN_KEY || "",
  },
  DB: {
    DB1: {
      username: process.env.DB_USER || "",
      password: process.env.DB_PASSWORD || "",
      DB_name:
        process.env.DB_NAME ||
        "",
    },
  },
  googleApi: {
    SERVICE_ACCOUNT_EMAIL:
      "play-console-service-account@pc-api-5000574607963786387-86.iam.gserviceaccount.com",
    SERVICE_ACCOUNT_PRIVATE_KEY:
      "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDRTcPO7xslD63A\nCh51eDoCEjmUkoruEQVwkXhFGrLjm+9sgFBzMnTc56D4cdvz1aH4hdO6BruKYS2P\nbTsKmHysVC/uFX83mpq2C3SNgKMc8BesGNAVxNMkH9IO9wURtmScWqL/WOikstov\nc11SXq6TheMT/km0MwZ51bHp1j/y/O8Vd5e37cFklvbStaAFY/O6Jc5YM1PrkEAj\ndj+JIjrsTRGV6giBmYAM9Fe++rTfjeM+ccqKdHzVXfg/Y1jTVqI+Jp7TE2dNiiEr\net8ecygnb4lPUg9fdUuyssTjuIkydLpXVzJJs0WBP1N7W/O0BopUW5+ZnBbI8H2G\nNpydNMsXAgMBAAECggEABYZHHKoCA5SU3PnyEN6yBUZO38WNxjfhIWCtldayZxXs\nGBHmTbbEuo9LQpOFdJEB0Un9qy4spWaS6ci+eLVKq8/IY2viK5O4nAUpt+cafGk3\n7r0e7PGA3eC7I4BQpsWI2qRSeL6eMWQJJJx9F5n+g0/9jOm22ftIzflz1JITpl8L\neeHMHd74dznYhRMC+MQd75WKMgByhUM9NgK5NNdFGQ8uOOpVNwrkIalgO763Bvko\ni4gmojjpdSWusaUndvLa9I4TovKJE6tD4nhgL5hdPrBf4PhoDmH29ywX2yuMSrJQ\nwEgyICQYYttLhvisM7yW1m1hhaqwr9zmcEE/SMrT8QKBgQD8+PmRdwaMv2JxbIYg\nZM2pgd/rYKVGTUHsJtvDN/cleX5IGhh75yMg65rRsN6TR56G0bQ6cDSHuQYH0Iiq\nUNSWWYZ0C3DqVWYz/i8712g+RT9PzmsA2AIgnXUsinVX0ocJ+51xQ2KC2FOnqNfo\nI3MjmzA6Mz5qLFkCgqdKoA4U0QKBgQDTzwDMqPoyhQuEDe3Inqy64qOY/W3DXqfw\ny7O8PV2bbi3HxH+qimoQBW13+mKodaXINUnuwvpGvmXTFRIc3w3DqXlKhTXojaKA\nEpgHByCxJU8xrtYVSz0y214M4J1TOn7Z7eyNpYVw84GHhms00YAzZILK1zog8xRj\nx/D2xWp7ZwKBgQCYA61E4neHIIKxkftPgAOuNqMuOFdY1Zglpnws5XaYiFeAUF4i\nJpUPdUUFePlnG4SBk4ZwD3khjee3znIxln0JFCcdmLpztnnCCJ6toRW9RbNz66CV\nUziEDNqat2EoMxR+xTqpE0shQYmTmHyVvKe1382tS5nYB2o9ffG1gFS14QKBgQCN\nd2jVSNcy/uGeJZ93q2M6vzz9Zeb14jbRAXzecS4gLgqtrnSGd0Q3xyhCRh223j0H\n52+l5Nw8e9aOkTgzyFbtJDg6qZZD6LVsTP71UrFnH8AxMtESD9qkKRg8CZmKiTtI\nWzzvrmnd8wXEeucHtBWoPa2NxQqyDyjDLDuo1lo0aQKBgQCcLoNdcjx0CW1d8Be0\nagZGcxjWlOrylxu8FvOI4GxGzrYhG/H7txnzWSIkIo64acYKUGGwFZn+cOraPtNJ\nDedrjmIeIdExBkXiVcolxCbq/vIKoAuAyFLVqR/frvu5xeRxM2/8yVnVmcR1ZY17\n30lOvfzqtd+bWQQhPCXlbOxUHQ==\n-----END PRIVATE KEY-----\n",
  },
  jwt: {
    secret:
      process.env.JWT_SECRET_KEY ||
      "8x978w&*(@&#(@(#____SDKHGFYGDBXHAG*^@^@@_!_++!+@(*(=01==`0asdfnaicyiuayb(*^*7nsac982h)=0-39",
  },
  SENDGRID_API_KEY:
    "SG..WOUQCYJVQoQ6jO3Pit3O_",
  mail: {
    default: {
      // host: "mail.octalsol.com",
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      // ca: [fs.readFileSync("CA.pem")],
      auth: {
        user: "",
        pass: "",
      },
    },
    gmail: {},
  },
};
// mongodb://hammad:<password>@cluster0-shard-00-00-gc9l0.mongodb.net:27017,cluster0-shard-00-01-gc9l0.mongodb.net:27017,cluster0-shard-00-02-gc9l0.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority
