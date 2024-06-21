// models/investment.js
const mongoose = require('mongoose');

const investmentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    investmentPurpose: {
        type: String,
        required: true
    },
    investmentType: {
        type: String,
        required: true
    },
    investmentScheme: {
        type: String,
        required: true
    },
    investmentAmount: {
        type: Number,
        required: true
    },
    investmentDate: {
        type: Date,
        required: true
    },
    investmentDuration: {
        type: String,
        required: true
    },
    riskLevel: {
        type: String,
        required: true
    },
    taxStatus: {
        type: String,
        required: true
    },
    expectedReturn: {
        type: Number,
        required: true
    },
    additionalNotes: {
        type: String
    }
});

const Investment = mongoose.model('Investment', investmentSchema);

module.exports = Investment;
