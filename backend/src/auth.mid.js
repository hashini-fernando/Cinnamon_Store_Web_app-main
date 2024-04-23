import jwt from 'jsonwebtoken'; 

const UNAUTHORIZED = 401;

export default (req, res, next) => {
  const token = req.headers.access_token;
  if (!token) {
    return res.status(UNAUTHORIZED).json({ error: 'Unauthorized: Access token is missing.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); 
    req.user = decoded;
    next(); 
  } catch (error) {
    res.status(UNAUTHORIZED).json({ error: 'Unauthorized: Invalid access token.' });
  }
};
