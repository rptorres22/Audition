// server/routes/index.server.routes.js

module.exports = function (app) {
    // Load the 'index' controller
    var indexController = require('../controllers/index.server.controller'),
        userController = require('../controllers/users.server.controller'),
        passport = require('passport');

    // Mount the 'index' controller's 'render' method
    app.get('/', indexController.render);
    app.get('users', userController.render);

    //User Routes
    app.route('/users/signup')
        .get(userController.renderSignup)
        .post(userController.signup);

    app.route('/users/login')
        .get(userController.renderLogin)
        .post(passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: 'users/signin',
            failureFlash: false
        }));

    app.route('/api/users/list')
        .get(userController.list)

    app.route('/api/users/:userId')
        .get(userController.list);

    app.param('userId', userController.getUserByID);
};