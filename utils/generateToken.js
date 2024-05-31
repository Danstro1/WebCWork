import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId, res, isWorker = false, isAdmin = false) => {
	const token = jwt.sign({ userId, isWorker, isAdmin }, "1JBVB8VAcknR8Z3GcJkq2P9lkQN8nHMvpRlfGzSQCI4=", {
		expiresIn: "15d",
	});

	res.cookie("jwt", token, {
		maxAge: 15 * 24 * 60 * 60 * 1000,
		httpOnly: true,
		sameSite: "strict",
		secure: false,
	});
};

export default generateTokenAndSetCookie;
