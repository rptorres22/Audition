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
    }
});

mongoose.model('Team', teamSchema);