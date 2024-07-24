import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        reference: 'users'
    },
    name: {
        type: String, 
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    note: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});


if (mongoose.models && mongoose.models['transactions']) {

    delete mongoose.models['transactions'];

}


const TransactionModel = mongoose.model("transactions", transactionSchema);

export default TransactionModel;

