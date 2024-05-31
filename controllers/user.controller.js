import User from "../models/user.model.js";

export const getUser = async (req, res) => {
    try {

        res.status(200).json(req.user);

    } catch (error) {
        console.log("Error in getUser controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}

export const getWorkers = async (req, res) => {
    try {
        const workers = await User.find({ isWorker: true });

        res.status(200).json(workers);

    } catch (error) {
        console.log("Error in getWorkers controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}

export const deleteWorker = async (req, res) => {
    try {
        const worker = req.body;

        await User.deleteOne({ _id: worker._id });

        res.status(200).json({message: "Работник удален"});

    } catch (error) {
        console.log("Error in getWorkers controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}

export const changeData = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.user._id });
        const { name, surname, phone, email } = req.body;

        if (phone && phone.length !== 11) {
            return res.status(400).json({ error: "Номер телефона должен содержать 11 символов" });
        }

        const findUser = await User.findOne({
            $or: [
                { email: email, _id: { $ne: user._id } },
                { phone: phone, _id: { $ne: user._id } }
            ]
        });

        if (findUser) {
            return res.status(400).json({ error: "Номер телефона или почта уже заняты" });
        }

        if (name) user.name = name;
        if (surname) user.surname = surname;
        if (phone) user.phone = phone;
        if (email) user.email = email;

        await user.save();

        res.status(200).json({ message: "User data updated successfully" });
    } catch (error) {
        console.log("Error in changeData controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};