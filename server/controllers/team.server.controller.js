/**
 * Created by eawilson on 6/29/2015.
 */
var mongoose = require('mongoose'),
    TeamModel = mongoose.model('Team'),
    TeamMembersModel = mongoose.model('TeamMembers');

exports.createTeam = function (req, res) {
    var team = new TeamModel(req.body);
    team.save(function (err) {
        if (err) {
            return res.status(400)
                .send({
                    message: getErrorMessage(err)
                });
        } else {
            res.json(team);
        }
    });
};

exports.deleteTeam = function (req, res) { //TODO Implement Delete
    TeamModel.findByIdAndRemove(req.team.id);
};

exports.updateTeam = function(req,res){
    TeamModel.findByIdAndUpdate(req.team.id);
};

exports.addTeamMembers = function (req, res) {
    TeamModel.findByName("First", function (team) {
        console.log(req.foundUser);
        team.teamMembers.push(req.foundUser.id);
        team.save();
    });
};