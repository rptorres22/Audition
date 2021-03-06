/**
 * Created by eawilson on 6/5/2015.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var teamMembersSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    },
    teamId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Team'
    },
    roleId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Roles'
    },
    joinDate: {
        type: Date,
        default: Date.now
    }
});

mongoose.model('TeamMembers', teamMembersSchema);