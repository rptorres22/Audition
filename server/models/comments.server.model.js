/**
 * Created by eawilson on 6/26/2015.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var commentSchema = new Schema({
    fileId: {
        type: Schema.Types.ObjectId, ref: "Files"
    },
    lineNumber: {type: Number}
});

mongoose.model('Comment', commentSchema);