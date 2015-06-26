/**
 * Created by eawilson on 6/5/2015.
 */
var users = new Schema({
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