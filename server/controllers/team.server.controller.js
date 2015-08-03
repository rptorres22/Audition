/**
 * Created by eawilson on 6/29/2015.
 */
var mongoose = require('mongoose'),
    TeamModel = mongoose.model('Team'),
    TeamMembersModel = mongoose.model('TeamMembers');

exports.createTeam = function (req, res) {
    var team = new TeamModel(req.body);
    console.log(req.user);
    team.owner = req.user;
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

exports.deleteTeam = function (req, res) {
    var team = new TeamModel(req.body);
    console.log(req.user);
    team.owner = req.user;
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

exports.updateTeam = function(req,res){
    TeamModel.findByIdAndUpdate(req.team.id)
}
