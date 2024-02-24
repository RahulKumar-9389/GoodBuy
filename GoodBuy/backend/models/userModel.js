import mongoose from "mongoose";
import bcrypt, { genSalt } from 'bcrypt';
import JWT from 'jsonwebtoken';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true,
        trim: true
    },
    role: {
        type: Number,
        default: 0,
    }
});


// hash password
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next()
    }
    const salt_rounds = await bcrypt.genSalt(10);
    const hashed_password = await bcrypt.hash(this.password, salt_rounds);
    this.password = hashed_password;
});

// compare password
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password)
};


// genrate token
userSchema.methods.genrateToken = function () {
    try {
        return JWT.sign({
            id: this._id,
            email: this.email,
            address: this.address
        },
            process.env.JWT_SECRET,
            { expiresIn: '2d' }
        )
    } catch (error) {
        console.log(error.message);
    }
}

export default mongoose.model('user', userSchema);