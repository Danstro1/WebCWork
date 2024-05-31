import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const signup = async (req, res) => {
	try {
		const { name, surname, password, email, phone } = req.body;

        const findUser = await User.findOne({
            $or: [
                { email: email },
                { phone: phone }
            ]
        });

        if (findUser) {
            return res.status(400).json({ error: "Номер телефона или почта уже заняты" });
        }

		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		const newUser = new User({
			name,
			surname,
			password: hashedPassword,
			email,
			phone,
		});
		if (newUser) {
			generateTokenAndSetCookie(newUser._id, res);
			console.log('ok');
			await newUser.save();

			res.status(201).json({
				_id: newUser._id,
				name: newUser.name,
				surname: newUser.surname,
				email: newUser.email,
				phone: newUser.phone,
			});
		} else {
			res.status(400).json({ error: "Invalid user data" });
		}
	} catch (error) {
		console.log("Error in signup controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

export const signupWorker = async (req, res) => {
	try {
		const { name, surname, password, email, phone } = req.body;

        const findUser = await User.findOne({
            $or: [
                { email: email },
                { phone: phone }
            ]
        });

        if (findUser) {
            return res.status(400).json({ error: "Номер телефона или почта уже заняты" });
        }

		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		const newUser = new User({
			name,
			surname,
			password: hashedPassword,
			email,
			phone,
			isWorker: true,
		});

		if (newUser) {
			await newUser.save();

			res.status(201).json({
				_id: newUser._id,
				name: newUser.name,
				surname: newUser.surname,
				email: newUser.email,
				phone: newUser.phone,
			});
		} else {
			res.status(400).json({ error: "Invalid user data" });
		}
	} catch (error) {
		console.log("Error in signup controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

export const login = async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ email });
		const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");
		if (!user || !isPasswordCorrect) {
			return res.status(400).json({ error: "Invalid email or password" });
		}

		generateTokenAndSetCookie(user._id, res, user.isWorker, user.isAdmin,);

		res.status(200).json({
			_id: user._id,
			name: user.name,
			surname: user.surname,
			email: user.email,
			phone: user.phone,
			isWorker: user.isWorker,
			isAdmin: user.isAdmin,
		});
	} catch (error) {
		console.log("Error in login controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

export const logout = (req, res) => {
	try {
		res.cookie("jwt", "", { maxAge: 0 });
		res.status(200).json({ message: "Logged out successfully" });
	} catch (error) {
		console.log("Error in logout controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};
