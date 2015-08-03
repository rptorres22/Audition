var mongoose = require('mongoose'),
    UserModel = mongoose.model('User');

var getErrorMessage = function (err) {
    if (err.errors) {
        for (var errName in err.errors) {
            if (err.errors[errName].message)
            // only return first error as to not overwhelm user
                return err.errors[errName].message;
        }
    } else {
        return 'Unknown server error';
    }
};

exports.render = function (req, res) {
    res.render('/users', {
        title: "Users"
    });
};

exports.createUser = function (req, res) {
    var user = new UserModel(req.body);
    user.save(function (err) {
        if (err) {
            // If an error occurs send the error message
            return res.status(400)
                .send({
                    message: getErrorMessage(err)
                });
        } else {
            res.json(user);
        }
    });
};

exports.listAll = function (req, res) { //TODO make right
    UserModel.find().sort('-created')
        .exec(function (err, data) {
            if (err) {
                // If an error occurs send the error message
                return res.status(400)
                    .send({
                        message: getErrorMessage(err)
                    });
            } else {
                // Send a JSON representation of the articles
                res.json(data);
            }
        });
};


exports.getUserByID = function (req, res, next, id) {
    UserModel.findById(id).exec(function (err, user) {
        if (err)
            return next(err);
        if (!user)
            return next(new Error('Failed to get User ' + id));

        req.user = user;

        next();
    })
};

exports.getUserByUsername = function (req, res, next, un) {
    UserModel.findOne({'normalizedUsername': un.toLowerCase()}).select({'_id':0}).exec(function (err, user) {
        if (err)
            return next(err);
        if (!user)
            return next(new Error('Failed to get User ' + un));

        req.foundUser = user;
        next();
    })
};

exports.read = function (req, res) {
    res.json(req.user);
};


//Page Render Methods
exports.renderUserProfile = function (req, res) {

    if (req.user) {
        res.render('users/profile', {
            title: req.foundUser.firstName + '\'s Profile',
            messages: req.flash('error') || req.flash('info'),
            user: req.foundUser
        });
    } else {
        return res.redirect('/');
    }
};

exports.renderLogin = function (req, res, next) {
    if (!req.user) {
        res.render('users/login', {
            title: 'Audition Sign In',
            messages: req.flash('error') || req.flash('info')
        });
    } else {
        return res.redirect('/');
    }
};

exports.renderSignup = function (req, res, next) {
    if (!req.user) {
        res.render('users/signup', {
            title: 'Sign up for Audition',
            messages: req.flash('error')
        });
    } else {
        return res.redirect('/');
    }
};

exports.signup = function (req, res, next) {
    if (!req.user) {
        var user = new UserModel(req.body);
        var message = null;
        user.provider = 'local';
        user.save(function (err) {
            if (err) {
                var message = getErrorMessage(err);
                req.flash('error', message);
                return res.redirect('/users/signup');
            }
            req.login(user, function (err) {
                if (err) return next(err);
                return res.redirect('/');
            });
        });
    } else {
        return res.redirect('/');
    }
};

exports.logout = function (req, res) {
    req.logout();
    res.redirect('/');
};

