import mongoose, { Model } from "mongoose"

interface UserInterface {
  id: string,
  fullName: string,
  email: string,
  password: string,
  createdAt: Date
}

const userSchema = new mongoose.Schema<UserInterface>({
  id: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  }
})

const User: Model<UserInterface> = mongoose.models.User || mongoose.model<UserInterface>('User', userSchema)

export default User