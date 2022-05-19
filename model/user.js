const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { isEmail } = require("validator");


const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Please enter an email"],
        unique: true,
        lowercase: true,
        validate: [isEmail, "Please enter a valid email"]
    },
    password: {
        type: String,
        required: [true, "Please enter a password"],
        minlength: [6, "Minimum password length is 6 characters"]
    }
});

//hooks
//hash password

userSchema.pre("save", async function(next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

//method to login user
userSchema.statics.login = async function(email, password) {
    const user = await this.findOne({ email: email });
    if(user) {
        const auth = await bcrypt.compare(password, user.password);
        if(auth) {
            return user;
        }
        throw Error("incorrect password");
    }
    throw Error("incorrect email");
}


const AUser = mongoose.model("AUser", userSchema)



module.exports = AUser;