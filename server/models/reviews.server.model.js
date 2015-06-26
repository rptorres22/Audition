/**
 * Created by eawilson on 6/26/2015.
 */
var reviews = new Schema({
    ownerId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    },
    teamId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    },
    name: {
        type: String,
        default: ''
    }
});