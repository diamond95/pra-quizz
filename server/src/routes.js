/**
 * @file Server routes 
 * @module routes
 * @category server/src
 */
const AuthController = require('./controllers/AuthController')
const AuthControllerPolicy = require('./policies/AuthControllerPolicy')
const isAuthenticated = require('./policies/isAuthenticated')


module.exports = (app) => {

    /**
     * @description Default route
     * @method GET
     * @returns {Object} Default message
     */
    app.get('/', (req, res) => {
        res.send({
            message: 'hello bitches'
        })
    })


    /////////////////////////////////////////////////////////////////////
    ///                                                                //
    ///                          Auth                                  //
    ///                                                                //
    /////////////////////////////////////////////////////////////////////
    /**
     * @description User's registration
     * @method POST
     */
    app.post('/register', isAuthenticated, AuthControllerPolicy.register, AuthController.register)

    /**
     * @description User's login
     * @method POST
     */
    app.post('/login', AuthControllerPolicy.login, AuthController.login)



  

}