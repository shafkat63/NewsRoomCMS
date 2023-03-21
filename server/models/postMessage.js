import mongoose from "mongoose";

const postSchema = mongoose.Schema({
	title: String,
	message: String,
	name: String,
	creator: String,
	tags: [String],
	selectedFile: String,
	factCheck: {
		type: String,
		default: "FactCheck Coming",
		enum: [
			"FactCheck Coming",
			"True",
			"False",
			"Slightly  True",
			"Slightly  False",
			"Misleading",
		],
	},
	comments: { type: [String], default: [] },
	storyStatus: {
		type: String,
		default: "pending",
		enum: ["pending", "upload pending", "approval pending", "approved"],
	},

	createdAt: {
		type: Date,
		default: new Date(),
	},
});

var PostMessage = mongoose.model("PostMessage", postSchema);

export default PostMessage;
