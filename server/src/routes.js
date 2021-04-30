/**
 * @file Server routes 
 * @module routes
 * @category server/src
 */
const AuthController = require('./controllers/AuthController')
const AuthControllerPolicy = require('./policies/AuthControllerPolicy')
const isAuthenticated = require('./policies/isAuthenticated')
const QuizzController = require('./controllers/QuizzController')

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
    app.post('/register', AuthController.register)

    /**
     * @description User's login
     * @method POST
     */
    // removed policy for authentication, joi AuthControllerPolicy.login,
    app.post('/login',  AuthController.login)

    /**
     * @description Join game via PIN
     * @method POST
     */
    app.post('/joinGame', AuthController.joinGame)

    /////////////////////////////////////////////////////////////////////
    ///                                                                //
    ///                          Quizz                                 //
    ///                                                                //
    /////////////////////////////////////////////////////////////////////

    /**
     * @description Get quizz information
     * @method POST
     */
     app.post('/getQuizzInformation', isAuthenticated, QuizzController.getQuizzInformation)

     /**
     * @description Get question
     * @method POST
     */
    app.post('/getQuestion', isAuthenticated, QuizzController.getQuestion)

    /**
    * @description Get answers
    * @method POST
    */
    app.post('/getAnswers', isAuthenticated, QuizzController.getAnswers)

    /**
    * @description Check if quizz is active
    * @method POST
    */
     app.post('/isActiveQuizz', isAuthenticated, QuizzController.isActiveQuizz)

    /**
    * @description Get correct answers
    * @method POST
    */
     app.post('/validateSelectedAnswers', isAuthenticated, QuizzController.validateSelectedAnswers)



  

}