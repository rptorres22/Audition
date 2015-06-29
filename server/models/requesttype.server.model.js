/**
 * Created by eawilson on 6/26/2015.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var requestTypeSchema = new Schema({
    name: {
        type: String
    },
    text: {
        type: String
    }
});

mongoose.model('RequestType', requestTypeSchema);