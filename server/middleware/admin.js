import auth from './auth.js';

const admin = async (req, res, next) => {
  try {
    // First authenticate the user
    await auth(req, res, (err) => {
      if (err) {
        return res.status(401).json({ error: 'Please authenticate.' });
      }
      
      // Then check if user is admin
      if (req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Access denied. Admin privileges required.' });
      }
      
      next();
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export default admin; 