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
        type: Schema.Types.ObjectId
    },
    requester: {
        type: Schema.Types.ObjectId, ref: 'User'
    },
    text: {
        type: String
    },
    date: {
        type: Date
    }
});

mongoose.model('Request', requestSchema);