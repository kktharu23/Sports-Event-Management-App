const Player = require('../model/playerschema');

exports.viewerlogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const player = await Player.findOne({ email });

    if (!player) {
      return res.status(401).json({ status: 'Failure', message: 'Invalid email or password.' });
    }

    if (player.password === password) {
      // Login successful, send the user ID as part of the response
      res.status(200).json({ status: 'Success', playerId: player._id, message: 'Login successful.' });
    } else {
      return res.status(401).json({ status: 'Failure', message: 'Invalid email or password.' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ status: 'Failure', message: 'An error occurred during login. Please try again.' });
  }
};



exports.playerid = async (req, res) => {
  const playerId = req.params.id;

  // Check if playerId is valid
  if (!playerId) {
    return res.status(400).json({ error: 'Invalid player ID' });
  }

  try {
    const player = await Player.findById(playerId);
    if (!player) {
      return res.status(404).json({ error: 'Player not found' });
    }
    // Respond with the player data
    res.json(player);
  } catch (error) {
    console.error('Error fetching player:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

exports.addPlayer = async (req, res) => {
  try {
    // Create a new player document
    const newPlayer = new Player(req.body);
    // Save the player data to MongoDB
    await newPlayer.save();
    res.status(201).json({ message: 'Player added successfully' });
  } catch (error) {
    console.error('Error adding player:', error);
    res.status(500).json({ error: 'Error adding player' });
  }
};

exports.getPlayerDetails = async (req, res) => {
  try {
    const players = await Player.find();
    res.json({ Status: 'Success', Result: players });
  } catch (error) {
    console.error(error);
    res.status(500).json({ Status: 'Error', Message: 'Unable to fetch player details' });
  }
};

exports.PlayerDetails = async (req, res) => {
  try {
    const players = await Player.find(); // Fetch all players from MongoDB
    res.json({ Status: 'Success', Result: players });
  } catch (error) {
    console.error(error);
    res.status(500).json({ Status: 'Error', Message: 'Unable to fetch player details' });
  }
};

exports.getPlayerById = async (req, res) => {
  const playerId = req.params.id;

  // Check if playerId is valid
  if (!playerId) {
    return res.status(400).json({ error: 'Invalid player ID' });
  }

  try {
    const player = await Player.findById(playerId);
    if (!player) {
      return res.status(404).json({ error: 'Player not found' });
    }
    // Respond with the player data
    res.json(player);
  } catch (error) {
    console.error('Error fetching player:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


exports.updatePlayer = async (req, res) => {
  try {
    const playerId = req.params.id;
    const updatedData = req.body; // Assuming the updated data is sent in the request body
    const updatedPlayer = await Player.findByIdAndUpdate(playerId, updatedData, { new: true });

    if (!updatedPlayer) {
      return res.status(404).json({ Status: 'Error', message: 'Player not found' });
    }

    res.json({ Status: 'Success', updatedPlayer });
  } catch (error) {
    console.error('Error updating player data:', error);
    res.status(500).json({ Status: 'Error', message: 'Internal server error' });
  }
};

exports.DeletePlayer = async (req, res) => {
  try {
    const playerId = req.params.id;
    const deletedPlayer = await Player.findByIdAndDelete(playerId);

    if (!deletedPlayer) {
      return res.status(404).json({ Status: 'Error', message: 'Player not found' });
    }

    res.json({ Status: 'Success', message: 'Player deleted successfully' });
  } catch (error) {
    console.error('Error deleting player data:', error);
    res.status(500).json({ Status: 'Error', message: 'Internal server error' });
  }
}