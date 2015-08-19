/**
 * Created by eawilson on 6/29/2015.
 */
var mongoose = require('mongoose'),
    TeamModel = mongoose.model('Team'),
    TeamMembersModel = mongoose.model('TeamMembers');

var getErrorMessage = function (err) {
    var message = '';
    if (err.code) {
        switch (err.code) {
            case 11000:
            case 11001:
                message = 'Team name already exists';
                break;
            default:
                message = 'Something went wrong';
        }
    } else {
        for (var errName in err.errors) {
            if (err.errors[errName].message) message = err.errors[errName].
                message;
        }
    }
    return message;
};

exports.hasAuthorization = function (req, res, next) {
    if (req.team.owner.id !== req.user.id) {
        return res.status(403).send({
            message: 'User not authorized to edit team'
        });
    }
    next();
};

/*              CRUD                */
exports.create = function (req, res) {
    var team = new TeamModel(req.body);
    team.owner = req.user;
    team.save(function (err) {
        if (err) {
            return res.status(400)
                .send({message: getErrorMessage(err)});
        } else {
            res.json(team);
        }
    });
};

exports.read = function (req, res) {
    res.json(req.team);
};

exports.update = function (req, res) {
    TeamModel.findByIdAndUpdate(req.team.id);
};

exports.delete = function (req, res) { //TODO Implement Delete
    var team = req.team;
    team.remove(function (err) {
        if (err) {
            return res.status(400).send({message: getErrorMessage(err)});
        } else {
        }
    });
};

exports.listAll = function (req, res) {
    TeamModel.find().populate(('owner')).populate('teamMembers').exec(function (err, teams) {
        if (err) {
            return res.status(400).send({message: getErrorMessage(err)});
        } else {
            res.json(teams);
        }
    });
};

exports.addMember = function (req, res, next) {
    var teamName = req.params.teamName;

    TeamModel.findByName(teamName, function (err, team) {
        if (team.teamMembers.indexOf(req.userSearch.id) == -1) {
            team.teamMembers.push(req.userSearch.id);
            team.save(function (err) {
                if (err) {
                    return next(err);
                } else {
                    res.json(team);
                }
            });
        }
        else {
            res.status(400).send({
                message: "Error! " + req.userSearch.normalizedUsername + " is already a member of team: " + teamName
            });
        }
    });
};

exports.removeMember = function (req, res, next) {
    var teamName = req.params.teamName;

    TeamModel.findByName(teamName, function (err, team) {
        if (team.teamMembers.indexOf(req.userSearch._id) > -1) {
            team.teamMembers.pop(req.userSearch.id);
            team.save(function (err) {
                if (err) {
                    return next(err);
                } else {
                    res.json(team);
                }
            });
        }
        else {
            res.status(400).send({
                message: "Error! " + req.userSearch.normalizedUsername + " is not a member of team: " + teamName
            });
        }
    });
};

/*              Routing Helpers                */
exports.teamById = function (req, res, next, id) {
    TeamModel.findById(id).populate('teamMembers', 'username firstName lastName email').exec(function (err, team) {
        if (err) return next(err);
        if (!team) return next(new Error('Failed to load article ' + name));

        req.team = team;
        next();
    });
};

exports.teamByName = function (req, res, next, name) {
    TeamModel.findOne({teamName: new RegExp(name, 'i')}).populate('teamMembers').exec(function (err, team) {
        if (err) return next(err);
        if (!team) return next(new Error('Failed to load team ' + name));

        req.team = team;
        next();
    });
};