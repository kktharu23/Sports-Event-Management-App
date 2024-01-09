const express = require('express');
const router = express.Router();
const controller = require('../controller/playercontroller');

router.get('/api/player/:id', controller.playerid);
router.post('/api/login', controller.viewerlogin);
// Add a new player
router.post('/api/addPlayer', controller.addPlayer);

// Fetch all players
router.get('/getPlayer', controller.getPlayerDetails);

router.get('/Player', controller.PlayerDetails);

// Get a player by ID
router.get('/api/player/:id', controller.getPlayerById);

// Update a player by ID
router.put('/api/player/:id', controller.updatePlayer);

// Delete a player by ID
router.delete('/api/player/:id', controller.DeletePlayer);

module.exports = router;