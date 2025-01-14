const Origin = require('../models/origin');

const validateAPIKey = async (req,res,next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      return res.status(401).send({ error: 'Authorization header missing' });
    }
    const token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;
    if (!token) {
      return res.status(401).send({ error: 'Authorization token missing' });
    }


    if(! await Origin.APIKeyValid(token)){
        return res.status(401).send({ error: 'Invalid Authorization Token'});  
    }

    next();
}

module.exports = validateAPIKey;