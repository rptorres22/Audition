/**
 * Created by eawilson on 6/5/2015.
 */
var team = new Schema({
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