const User = require('../model/Schema');
const bcrypt = require('bcrypt');
const saltRounds = 10; // Set saltRounds to an appropriate value

exports.register = async (req, res) => {
  try {
    const { email, name, password } = req.body;

    // Check if a user with the same email already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: 'Email is already in use' });
    }

    // Hash the password and save the new user
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const user = new User({ email,name, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

// User login endpoint
exports.adminlogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('Received login request for email:', email);

    const user = await User.findOne({ email });
    console.log('Found user:', user);

    if (!user) {
      console.log('User not found');
      return res.status(401).json({ Error: 'User not found' }); // Return an error message
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    console.log('Password match:', passwordMatch);

    if (!passwordMatch) {
      console.log('Invalid password');
      return res.status(401).json({ Error: 'Invalid password' }); // Return an error message
    }

    console.log('Login successful');
    res.json({ Status: 'Success' }); // Successful login
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ Error: 'Internal server error' }); // Internal server error
  }
};
