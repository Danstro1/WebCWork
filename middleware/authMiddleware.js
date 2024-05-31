import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
    const token = req.cookies.jwt;

    const publicPaths = [
        '/auth/login/login.html',
        '/auth/login/login.js',
        '/auth/register/register.html',
        '/auth/register/register.js',
        '/style.css',
        '/api/auth/login',
        '/api/auth/signup'
    ];

    const isPublicPath = publicPaths.some(publicPath => req.path.startsWith(publicPath));

    if (isPublicPath) {
        return next();
    }

    if (!token) {
        return res.redirect('/auth/login/login.html');
    }

    try {
        const decoded = jwt.verify(token, "1JBVB8VAcknR8Z3GcJkq2P9lkQN8nHMvpRlfGzSQCI4=");
        req.user = decoded;
        next();
    } catch (err) {
        return res.redirect('/auth/login/login.html');
    }
};

export default authMiddleware;