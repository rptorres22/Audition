/**
 * Created by eawilson on 6/5/2015.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var roleSchema = new Schema({
    name: {
        type: String
    },
    accessLevel: {
        type: String
    }
});


mongoose.model('Roles', roleSchema);