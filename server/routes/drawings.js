import express from 'express';
import Drawing from '../models/Drawing.js';

const router = express.Router();

// GET /api/drawings - Get all drawings (for gallery)
router.get('/', async (req, res) => {
  try {
    const drawings = await Drawing.find()
      .select('title createdAt updatedAt width height')  // Don't send imageData in list
      .sort({ updatedAt: -1 });  // Newest first
    res.json(drawings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/drawings/:id - Get single drawing
router.get('/:id', async (req, res) => {
  try {
    const drawing = await Drawing.findById(req.params.id);
    if (!drawing) {
      return res.status(404).json({ message: 'Drawing not found' });
    }
    res.json(drawing);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/drawings/:id/thumbnail - Get drawing thumbnail
router.get('/:id/thumbnail', async (req, res) => {
  try {
    const drawing = await Drawing.findById(req.params.id).select('imageData');
    if (!drawing) {
      return res.status(404).json({ message: 'Drawing not found' });
    }
    res.json({ imageData: drawing.imageData });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST /api/drawings - Create new drawing
router.post('/', async (req, res) => {
  try {
    const { title, imageData, width, height } = req.body;
    
    const drawing = new Drawing({
      title: title || 'Untitled',
      imageData,
      width,
      height
    });
    
    const savedDrawing = await drawing.save();
    res.status(201).json(savedDrawing);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT /api/drawings/:id - Update existing drawing
router.put('/:id', async (req, res) => {
  try {
    const { title, imageData, width, height } = req.body;
    
    const drawing = await Drawing.findById(req.params.id);
    if (!drawing) {
      return res.status(404).json({ message: 'Drawing not found' });
    }
    
    // Update fields
    if (title) drawing.title = title;
    if (imageData) drawing.imageData = imageData;
    if (width) drawing.width = width;
    if (height) drawing.height = height;
    
    const updatedDrawing = await drawing.save();
    res.json(updatedDrawing);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE /api/drawings/:id - Delete drawing
router.delete('/:id', async (req, res) => {
  try {
    const drawing = await Drawing.findById(req.params.id);
    if (!drawing) {
      return res.status(404).json({ message: 'Drawing not found' });
    }
    
    await Drawing.findByIdAndDelete(req.params.id);
    res.json({ message: 'Drawing deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
