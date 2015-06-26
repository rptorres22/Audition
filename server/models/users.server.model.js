/**
 * Created by eawilson on 6/5/2015.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    name: {
        type: String
    },
    accessType: {
        type: String
    },
    createdDate: {
        type: Date, default: Date.now
    }
});

mongoose.model('Users', userSchema);