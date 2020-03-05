const AuthController = require('./controllers/authentification')
require('./services/passport')
const passport = require("passport")

const requireToken = passport.authenticate("jwt", { session: false })
const requireValideCredentials = passport.authenticate("local", { session: false })

module.exports = function (expressServer) {
    expressServer.get("/", function(req, res, next) {
        res.send({serverData: ["Pif", "Paf", "Pouf"]})
    })
    expressServer.post("/signup", AuthController.signup)
    expressServer.get("/ressourcesSecrete", requireToken, function(req, res) {
        res.send({codeDeLaMort: 42})
    })
    expressServer.post("/signin", requireValideCredentials, AuthController.signin)
}