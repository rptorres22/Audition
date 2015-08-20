// server/routes/index.server.routes.js

module.exports = function (app) {
    // Load the 'index' controller
    var indexController = require('../controllers/index.server.controller'),
        userController = require('../controllers/users.server.controller'),
        teamController = require('../controllers/team.server.controller'),
        passport = require('passport');

    // Mount the 'index' controller's 'render' method
    app.get('/', indexController.render);
    app.get('/users', userController.render);


    /* User Routes */
    app.route('/users/signup')
        .get(userController.renderSignup)
        .post(userController.signup);

    app.route('/users/login')
        .get(userController.renderLogin)
        .post(passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: 'login',
            failureFlash: true
        }));

    app.route('/logout').get(userController.logout);

    app.route('/api/users/list')
        .get(userController.listAll);

    app.route('/users/:username')
        .get(userController.renderUserProfile);




    /* Team Routes */

    app.route('/api/team/')
        .get(teamController.listAll);

    app.route('/api/team/:teamName')
        .get(teamController.read);

    app.route('/api/team/create')
        .post(userController.requiresLogin, teamController.create);

    app.route('/api/team/:teamName/Members/:username')
        .post(teamController.addMember)
        .delete(teamController.removeMember);

    app.route('/api/team/:teamName')
        .get(teamController.read);

    app.param('username', userController.getUserByUsername);
    app.param('teamName', teamController.teamByName);
};