const mongoose = require("mongoose");
const argon2 = require("argon2");

const adminSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      minlength: 3,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    role: {
      type: String,
      enum: ["admin"],
      default: "admin",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Hash password before saving
adminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await argon2.hash(this.password, {
    type: argon2.argon2id,
  });
  next();
});

// Compare password
adminSchema.methods.matchPassword = async function (enteredPassword) {
  return argon2.verify(this.password, enteredPassword);
};

module.exports = mongoose.model("Admin", adminSchema);
