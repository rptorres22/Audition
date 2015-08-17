/**
 * Created by eawilson on 6/5/2015.
 */
var mongoose = require('mongoose'),
    crypto = require('crypto'),
    Schema = mongoose.Schema;

var userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: 'Username is required',
        trim: true
    },
    normalizedUsername: {
        type: String,
        unique: true,
        trim: true,
        lowercase: true
    },
    firstName: {
        type: String,
        required: 'First name is required',
        trim: true
    },
    lastName: {
        type: String,
        trim: true,
        required: 'Last name is required',
    },
    email: {
        type: String, match: [/.+\@.+\..+/, "Please fill a valid e-mail address"],
        required: 'An e-mail address is required',
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: 'Password is required',
        validate: [
            function (password) {
                return password && password.length > 6;
            }, 'Password should be longer'
        ],
    },
    salt: {
        type: String
    },
    provider: {
        type: String,
        required: 'Provider is required',
    },
    providerId: {
        type: String
    },
    providerData: {},
    created: {
        type: Date,
        default: Date.now
    },
    accessType: {
        type: String,
        default: 'level1'
    }
});

userSchema.virtual('fullName').get(function () {
    return this.firstName + ' ' + this.lastName;
}).set(function (fullName) {
    var splitName = fullName.split(' ');
    this.firstName = splitName[0] || '';
    this.lastName = splitName[1] || '';
});

userSchema.pre('save', function (next) {
    if (this.password) {
        this.salt = new
            Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
        this.password = this.hashPassword(this.password);
    }
    if(this.username){
        this.normalizedUsername = this.username;
    }
    next();
});

userSchema.methods.hashPassword = function (password) {
    return crypto.pbkdf2Sync(password, this.salt, 10000,
        64).toString('base64');
};

userSchema.methods.authenticate = function (password) {
    return this.password === this.hashPassword(password);
};


userSchema.statics.findUniqueUsername = function (username, suffix, callback) {
    var _this = this;
    var possibleUsername = username + (suffix || '');
    _this.findOne({
        username: possibleUsername
    }, function (err, user) {
        if (!err) {
            if (!user) {
                callback(possibleUsername);
            } else {
                return _this.findUniqueUsername(username, (suffix || 0) + 1, callback);
            }
        } else {
            callback(null);
        }
    });
};

userSchema.set('toJSON', {
    getters: true,
    virtuals: true
});

mongoose.model('User', userSchema);