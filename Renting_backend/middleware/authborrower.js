const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.header('auth_token');
    if (!token)
        return res.send({
            error: true,
            msg: 'Access denied',
        });

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.borrower = verified;
        next();
    } catch (err) {
        return res.send({
            error: true,
            msg: 'Please Login again',
        });
    }
};