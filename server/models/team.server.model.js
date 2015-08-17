/**
 * Created by eawilson on 6/5/2015.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var teamSchema = new Schema({
    teamName: {
        type: String
    },
    createdDate: {
        type: Date,
        default: Date.now
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    },
    teamMembers: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    }],
});

teamSchema.pre('save', function (next) {
    if(this.teamName){
    }
    next();
});

teamSchema.statics.findByName = function (name, callback) {
    var _this = this;
    _this.findOne({teamName: name}, function (err, team) {
        if (!err) {
            if (!team) {
                //callback(possibleUsername);
            } else {
                return callback(team);
            }
        } else {
            //callback(null);
        }
    });
}

mongoose.model('Team', teamSchema);