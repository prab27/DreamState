import mongoose from "mongoose";

//define schema
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fdepositphotos.com%2Fvectors%2Fuser-profile.html&psig=AOvVaw1cgEX4VgcDvxw8XCrhR_PR&ust=1711975931180000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCNCJgb7FnoUDFQAAAAAdAAAAABAE",
    },
  },
  { timestamps: true }
); //add extra info to the data(creation and updation time)

//create the model
const User = mongoose.model("User", userSchema);

export default User;
