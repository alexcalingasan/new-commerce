import { Document, Model, ObjectId, Schema, model, models } from "mongoose";
import { compare, genSalt, hash } from "bcrypt";

const { ObjectId } = Schema.Types;

interface EmailVerificationTokenDocument extends Document {
    user: ObjectId;
    token: string;
    createdAt: Date;
}

interface Methods {
    compareToken(token: string): Promise<boolean>;
}

const EmailVerificationTokenSchema = new Schema<EmailVerificationTokenDocument, {}, Methods>({
  user: {
    type: ObjectId,
    required: true,
    ref: 'User', // Assuming there is a User model
  },
  token: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    expires: 60 * 60 * 24
  },
});

// Pre-save hook to hash the token before saving to the database
EmailVerificationTokenSchema.pre('save', async function (next) {
  try {
    if(!this.isModified('token'))
        return next();

    const salt = await genSalt(10);
    this.token =  await hash(this.token, salt);
    next();
  } catch (error) {
    throw error;
  }
});

// Method to compare a token with a hashed token using bcrypt's compare method
EmailVerificationTokenSchema.methods.compareToken = async function (tokenToCompare:string) {
  try {
    const result = await compare(tokenToCompare, this.token);
    return result;
  } catch (error) {
    throw error;
  }
};

// // Set token expiration to 24 hours
// EmailVerificationTokenSchema.virtual('expiresAt').get(function () {
//   const expiresInHours = 24;
//   const expiresAt = new Date(this.createdAt);
//   expiresAt.setHours(expiresAt.getHours() + expiresInHours);
//   return expiresAt;
// });

// // Middleware to check if the token has expired
// EmailVerificationTokenSchema.pre('save', function (next) {
//   if (this.isModified('createdAt')) {
//     const now = new Date();
//     if (this.expiresAt < now) {
//       return next(new Error('Token has expired'));
//     }
//   }
//   next();
// });

const EmailVerificationToken = models.EmailVerificationToken || model('EmailVerificationToken', EmailVerificationTokenSchema);

export default EmailVerificationToken as Model<EmailVerificationTokenDocument, {}, Methods>;
