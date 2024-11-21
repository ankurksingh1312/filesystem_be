import express, { Router, Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import FileSystem from '../models/FileSystem';

const router: Router = express.Router();

// Get filesystem by ID
router.get('/:id', async (req:any, res:any) => {
    try {
      const { id } = req.params;
      const fileSystem = await FileSystem.findById(id);
      
      if (!fileSystem) {
        return res.status(404).json({ message: 'Filesystem not found' });
      }
      
      res.json(fileSystem);
    } catch (error: any) {
      if (error.kind === 'ObjectId') {
        return res.status(400).json({ message: 'Invalid ID format' });
      }
      res.status(500).json({ message: 'Server error' });
    }
});

// Create new folder
router.post('/', async (req, res) => {
  try {
    const filesNfolders = req.body;
    console.log(filesNfolders);
    const fileSystem = new FileSystem(filesNfolders);
    await fileSystem.save();
    res.status(201).json(fileSystem);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update folder
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const update = req.body;
    const fileSystem = await FileSystem.findByIdAndUpdate(id, update, { new: true });
    res.json(fileSystem);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});
export default router; 