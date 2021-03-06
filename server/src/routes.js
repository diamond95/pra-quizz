/**
 * @file Server routes 
 * @module routes
 * @category server/src
 */
const AuthController = require('./controllers/AuthController')
// eslint-disable-next-line no-unused-vars
const AuthControllerPolicy = require('./policies/AuthControllerPolicy')
const isAuthenticated = require('./policies/isAuthenticated')
const QuizzController = require('./controllers/QuizzController')
const AdminController = require('./controllers/AdminController')

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

    /**
     * @description Save guest nickname
     * @method POST
     */
    app.post('/guestJoined', AuthController.guestJoined)

    /**
     * @description Reset account password
     * @method POST
     */
    app.post('/passwordReset', AuthController.passwordReset)

    /**
     * @description Save new password
     * @method POST
     */
    app.post('/changePassword', AuthController.changePassword)

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
     app.post('/getAnswersCorrectInfo', isAuthenticated, QuizzController.getAnswersCorrectInfo)

    /**
    * @description Set question is finished
    * @method POST
    */
     app.post('/markQuestionAnswered', isAuthenticated, QuizzController.markQuestionAnswered)

    /**
    * @description Get current joined guest list
    * @method POST
    */
     app.post('/getCurrentGuests', isAuthenticated, QuizzController.getCurrentGuests)

    /**
    * @description Save quest answers
    * @method POST
    */
     app.post('/saveAnswers', isAuthenticated, QuizzController.saveAnswers)


    /////////////////////////////////////////////////////////////////////
    ///                                                                //
    ///                          Admin                                 //
    ///                                                                //
    /////////////////////////////////////////////////////////////////////
  
    /**
    * @description Get list of all quizz by logged user
    * @method POST
    */
     app.post('/getQuizzList', isAuthenticated, AdminController.getQuizzList)
    
    /**
    * @description Get list of all quizz by logged user
    * @method POST
    */
     app.post('/createQuizz', isAuthenticated, AdminController.createQuizz)

    /**
    * @description Remove quizz
    * @method POST
    */
     app.post('/deleteQuizz', isAuthenticated, AdminController.deleteQuizz)

    /**
    * @description Run quizz
    * @method POST
    */
     app.post('/runQuizz', isAuthenticated, AdminController.runQuizz)

    /**
    * @description ?????? ?????????????? ????????????????
    * @method POST
    */
     app.post('/getCurrentQuestion', isAuthenticated, AdminController.getCurrentQuestion)

    /**
    * @description quizz finished 
    * @method POST
    */
     app.post('/quizzFinished', isAuthenticated, AdminController.quizzFinished)

    /**
    * @description get top players
    * @method POST
    */
     app.post('/getTopPlayers', isAuthenticated, AdminController.getTopPlayers)

    /**
    * @description edit user profile
    * @method POST
    */
     app.post('/editProfile', isAuthenticated, AuthController.editProfile)
}