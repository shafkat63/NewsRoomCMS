import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import user from "../models/user.js";
import tryCatch from "./tryCatch.js";
export const signin = async (req, res) => {
	const { email, password } = req.body;
	try {
		const existingUser = await user.findOne({ email });
		if (!existingUser)
			return res.status(404).json({
				message: "User does not exist",
			});
		const isPasswordCorrect = await bcrypt.compare(
			password,
			existingUser.password
		);
		if (!isPasswordCorrect)
			return res.status(404).json({
				message: "Invalid credentials.",
			});
		const { _id: id, name, imageUrl, role, active } = existingUser;
		if (!active)
			return res.status(400).json({
				success: false,
				message: "This account has been suspended! Try  to contact the admin",
			});
		const token = jwt.sign(
			{
				email: existingUser.email,
				id: existingUser._id,
				role: existingUser.role,
			},
			"test"
			// { expiresIn: "1h" }
		);
		res.status(200).json({ result: existingUser, token });
	} catch (error) {
		res.status(500).json({ message: "Something went wrong." });
		console.log(error);
	}
};

export const signup = async (req, res) => {
	const {
		email,
		password,
		confirmPassword,
		firstName,
		lastName,
		role,
		active,
		imageUrl,
	} = req.body;
	try {
		const existingUser = await user.findOne({ email });
		if (existingUser)
			return res.status(400).json({
				message: "User already exists",
			});

		if (password !== confirmPassword)
			return res.status(400).json({ message: "Password don't match." });
		const hashedPassword = await bcrypt.hash(password, 12);
		const result = await user.create({
			email,
			password: hashedPassword,
			name: `${firstName} ${lastName}`,
			role,
			active,
			imageUrl,
		});
		const token = jwt.sign(
			{ email: result.email, id: result._id },
			"test"
			//  {
			// 	expiresIn: "1h",
			// }
		);
		res.status(200).json({ result, token });
	} catch (error) {
		res.status(500).json({ message: "Something went wrong." });
	}
};

export const getUsers = async (req, res) => {
	const { page } = req.query;
	try {
		const LIMIT = 8;
		const startIndex = (Number(page) - 1) * LIMIT;
		const users = await user.find().sort({ _id: -1 });
		res.status(200).json(users);
	} catch (error) {
		console.log(error);
	}
};

export const updateUser = async (req, res) => {
	const { id } = req.params;
	const { role, active, imageUrl } = req.body;
	// if (!mongoose.Types.ObjectId.isValid(id))
	// 	return res.status(404).send(`No user with id: ${id}`);
	const updateUser = { role, active, imageUrl };

	// console.log(updateUser);
	const r = await user.findByIdAndUpdate(id, updateUser);
	// console.log(r);

	// const { email, _id } = r;
	// const token = jwt.sign(
	// 	{
	// 		email: r.email,
	// 		id: r._id,
	// 		role: { role },
	// 	},
	// 	"test"
	// 	// { expiresIn: "1h" }
	// );
	res.status(200).json({ success: true, result: { _id: id } });

	// console.log(error);
};


export const  getUser=  async (req, res) => {
	const { id } = req.params;

	try {
		const post = await user.findById(id);

		res.status(200).json(post);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};