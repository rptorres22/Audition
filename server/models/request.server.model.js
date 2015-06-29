/**
 * Created by eawilson on 6/26/2015.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var requestSchema = new Schema({
    typeId: {
        type: Schema.Types.ObjectId, ref: 'RequestTypes'
    },
    userId: {
        type: Schema.Type
    },
    requester: {
        type: Schema.Types.ObjectId, ref: 'Users'
    },
    text: {
        type: String
    },
    date: {
        type: Date.now
    }
});

mongoose.model('Request', requestSchema);