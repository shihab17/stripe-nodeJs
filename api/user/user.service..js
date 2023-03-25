const { User, Token } = require('../../models/index');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const UTILS = require('../../lib/utils');
const mailer = require('../../lib/mailer');
const create = async (user) => {
    try {
        user.password = await hashPassword(user.password);
        const Model = new User(user);
        user = await Model.save();
        return user;
    } catch (error) {
        return { error }
    }
}
const get = async () => {
    let users = await User.find({}, { password: 0 });
    return users;
}
const login = async (body) => {
    let user = await User.findOne({ email: body.email });
    if (!user) return { error: `user doesn't exist` }
    let isValidPassword = await comparePassword(body.password, user.password);
    if (!isValidPassword) return { error: `invalid credential ` };
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    let data = {
        time: new Date(),
        userId: user._id
    }
    const token = jwt.sign(data, jwtSecretKey);
    let result = {
        message: `Successfully login`,
        token: token
    }
    return { result: result };
}
const remove = async (userId) => {
    await User.deleteOne({ _id: userId });
    return { result: `Successfully deleted` };
}
const update = async (user, userId) => {
    try {
        user = await User.updateOne({ _id: userId }, { $set: user });
        return { result: `Successfully updated` };
    } catch (error) {
        return { error }
    }
}
const changePassword = async (body) => {
    try {
        let user = await User.findOne({ email: body.email });
        if (!user) return { error: 'User not found' };
        let isValidPassword = await comparePassword(body.oldPassword, user.password);
        if (!isValidPassword) return { error: `invalid old password ` };
        if (body.newPassword != body.confirmPassword) return { error: `did not match new password and confirm password ` };
        let newPass = await hashPassword(body.newPassword);
        await User.updateOne({ _id: user._id }, { $set: { password: newPass } });
        return { result: `your new password was updated successfully` }
    } catch (error) {
        return { error }
    }
}
const resetPassword = async (email) => {
    try {
        let user = await User.findOne(
            { email: email },
            { password: 0 }
        );
        if (!user) return { error: "User does not exist with this email" };
        delete user.password;
        let token = await UTILS.generateLink(user._id);
        let url = `http://localhost:5000/user/forgotpassword/${token}`;
        let emailBody = `<p>Your are requested for change your password. Click on the below link.</p> <p><a href=${url} target="_blank">Reset Password</p></p>`;
        await mailer.sendMail(user.email, 'Request for forgot password', emailBody);
        return { result: "Email has been sent with a forgot password link" };
    } catch (error) {
        return { error }
    }
}
const validateAndUpdatePassword = async (body, token) => {
    try {
        let tokenData = await Token.findOne({ token: token, consumed: false });
        if (!tokenData || tokenData.error) return { error: `your token is invalid` };
        await Token.updateOne({ token: token, consumed: false }, { $set: { consumed: true } });
        if (body.newPassword != body.confirmPassword) return { error: `did not match password` };
        body.newPassword = await hashPassword(body.newPassword);
        await User.updateOne({ _id: tokenData.userId }, { $set: { password: body.newPassword } });
        return { result: `Successfully updated your new password` };
    } catch (error) {
        return { error: error }
    }
}
const hashPassword = async (plaintextPassword) => {
    const hash = await bcrypt.hash(plaintextPassword, 10);
    return hash;
}

// compare password
const comparePassword = async (plaintextPassword, hash) => {
    const result = await bcrypt.compare(plaintextPassword, hash);
    return result;
}
module.exports = {
    create,
    get,
    login,
    remove,
    update,
    changePassword,
    resetPassword,
    validateAndUpdatePassword
}