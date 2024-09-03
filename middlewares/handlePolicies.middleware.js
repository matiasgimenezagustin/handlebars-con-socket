import passport from "passport";

const handlePolicies = (policies) => {
    policies = policies.map(policy => policy.toLowerCase());
    return (req, res, next) => {
        if (policies.includes('public')) {
            return next();
        }

        passport.authenticate('jwt-cookie', { session: false }, (err, user, info) => {
            if (err || !user) {
                return res.status(401).json({ message: 'Unauthorized' });
            }

            req.user = user;

            const userRole = user.role; 
            const isAuthorized = policies.includes(userRole);

            if (!isAuthorized) {
                return res.status(403).json({ message: 'Forbidden' });
            }

            next();
        })(req, res, next);
    };
};

export default handlePolicies;
