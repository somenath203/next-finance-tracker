import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    clerkUserId: {
      type: String,
      required: true,
    },
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    incomeCategories: {
      type: Array,
      default: ['salary', 'bonus', 'interest', 'dividend', 'others'],
    },
    expenseCategories: {
      type: Array,
      default: [
        'food',
        'transportation',
        'shopping',
        'housing',
        'entertainment',
        'health',
        'insurance',
        'education',
        'donation',
        'utility',
        'others',
      ],
    },
  },
  {
    timestamps: true,
  }
);


if (mongoose.models && mongoose.models['users']) {

  delete mongoose.models['users'];
  
}


const UserModel = mongoose.model("users", userSchema);

export default UserModel;