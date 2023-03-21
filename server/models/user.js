import mongoose from "mongoose";
const userSchema = mongoose.Schema(
	{
		name: { type: String, required: true },
		email: { type: String, required: true },
		password: { type: String, required: true },
		imageUrl: { type: String, default: "" },
		id: { type: String },
		role: {
			type: "String",
			default: "user",
			enum: ["user", "editor", "admin"],
		},
		active: { type: Boolean, default: true },
	},
	{ timestamps: true }
);

export default mongoose.model("user", userSchema);
