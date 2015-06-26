/**
 * Created by eawilson on 6/26/2015.
 */
var files = new Schema({
    reviewId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Review'
    },
    data: {
        type: Buffer
    },
    dateCreated: {
        type: Date,
        default: Date.now
    },
    accessLevel: {
        type: String
    },
    originalId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Files'
    },
    approval: {
        type: Boolean
    }
});