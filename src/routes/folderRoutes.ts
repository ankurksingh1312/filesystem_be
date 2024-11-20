import express from 'express';
import Folder from '../models/Folder';

const router = express.Router();

// Get all folders
router.get('/', async (req, res) => {
  try {
    const folders = await Folder.find().sort('order');
    res.json(folders);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create new folder
router.post('/', async (req, res) => {
  try {
    const { name, order } = req.body;
    const folder = new Folder({ name, order });
    await folder.save();
    res.status(201).json(folder);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update folder
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const update = req.body;
    const folder = await Folder.findByIdAndUpdate(id, update, { new: true });
    res.json(folder);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete folder
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Folder.findByIdAndDelete(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router; 