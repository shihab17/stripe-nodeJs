'use strict';

const mongoose = require('mongoose');
const objectId = mongoose.Schema.Types.ObjectId;

const TokenSchema = new mongoose.Schema({
    userId: { type: objectId, required: true, ref: 'User' },
    consumed: { type: Boolean, required: true },
    token: { type: String, required: true }
}, { timestamps: true, versionKey: false });

module.exports = mongoose.model('Token', TokenSchema);