/**
 * Created by eawilson on 6/26/2015.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var reviewsSchema = new Schema({
    ownerId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    },
    teamId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Team'
    },
    name: {
        type: String,
        default: ''
    }
});

mongoose.model('Reviews', reviewsSchema);