export const isAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(403).json({ error: "Access denied. Admins only." });
    }
};

export const isWorker = (req, res, next) => {
    if (req.user && req.user.isWorker) {
        next();
    } else {
        res.status(403).json({ error: "Access denied. Workers only." });
    }
};
