const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: { type: String, required: true },
    gender: { type: String, required: true },
    age: { type: Number, required: true },
    address: { type: String, required: true },
    income: { type: Number, required: true },
    expenses: { type: Number, required: true },
    amount: { type: Number, required: true },
    time: { type: Number, required: true },
    householdChores: { type: [String], required: true },
    goals: { type: String, required: true }
});


module.exports = mongoose.model('Goal', goalSchema);
