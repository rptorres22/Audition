/**
 * Created by eawilson on 6/26/2015.
 */
var viewStatus = new Schema({
    fileId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Files'
    },
    dateViewed: {
        type: Date
    },
    status: {
        type: String,
        default: 'Not Viewed'
    }
});