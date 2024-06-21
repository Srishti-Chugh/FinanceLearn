const mongoose = require('mongoose');

const loanSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    loanAmount: {
        type: Number,
        required: true
    },
    loanPurpose: {
        type: String,
        required: true
    },
    loanRate: {
        type: Number,
        required: true
    },
    loanDuration: {
        type: Number,
        required: true
    },
    amountPaid: {
        type: Number
    },
    loanStartDate: {
        type: Date,
        required: true
    },
    employmentStatus: {
        type: String,
        required: true
    },
    monthlyIncome: {
        type: Number,
        required: true
    },
    yearsEmployment: {
        type: Number
    },
    amountDebt: {
        type: Number
    },
    creditScore: {
        type: Number
    },
    collateralType: {
        type: String
    },
    collateralValue: {
        type: Number
    }
});

const Loan = mongoose.model('Loan', loanSchema);

module.exports = Loan;
