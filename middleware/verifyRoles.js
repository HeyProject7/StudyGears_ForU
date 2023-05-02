const verifyRoles = (...allowed) => {
    return (req, res, next) => {
        if (!req?.roles) return res.sendStatus(401);
        rolesArray = [...allowed];
        // const result = req.roles.map(role=>rolesArray.include(role))// true true false
        const result = req.roles.map(role => rolesArray.include(role)).find(val => val === true)// true true false
        if (!result) return res.sendStatus(401);
        next();
    }
}
module.exports = verifyRoles;