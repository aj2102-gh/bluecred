import express from 'express';
import multer from 'multer';
import path from 'path';
import { readDB, writeDB } from './db.js';
import { verifyImage } from './aiService.js';
import fs from 'fs';
import { mockCreateProject, mockMint } from './blockchainMock.js';
import { fileURLToPath } from 'url';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsPath = path.join(__dirname, '../uploads');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    fs.mkdirSync(uploadsPath, { recursive: true });
    cb(null, uploadsPath);
  },
  filename: function (req, file, cb) {
    const name = Date.now() + '_' + file.originalname.replace(/[^a-zA-Z0-9.]/g,'_');
    cb(null, name);
  }
});
const upload = multer({ storage });

function randCid(){ return 'bafy'+Math.random().toString(36).slice(2,12); }

router.post('/submit', upload.single('image'), async (req, res) => {
  try {
    const { ngo_name, title, lat, lon, ngo_wallet, community_wallet } = req.body;
    if(!ngo_name || !title || !req.file) return res.status(400).json({ error: 'ngo_name, title and image required' });
    const filePath = req.file.path;
    const ai = await verifyImage(filePath, lat, lon);
    const cid = randCid();
    const ipfsUrl = `ipfs://${cid}/${req.file.originalname}`;
    const db = readDB();
    const id = db.projects.length + 1;
    const project = {
      id, ngo_name, title, lat, lon, ngo_wallet, community_wallet,
      ipfs_cid: cid, ipfs_url: ipfsUrl,
      ai_passed: ai.passed, ai_confidence: ai.confidence, ai_score: ai.green_score,
      status: 'Pending', mock_tx_hash: null, created_at: Date.now()
    };
    db.projects.push(project);
    writeDB(db);
    return res.json({ project, ai, ipfs: { cid, url: ipfsUrl } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

router.get('/projects', (req, res) => {
  const db = readDB();
  res.json(db.projects);
});

router.post('/approve/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const db = readDB();
  const proj = db.projects.find(p=>p.id===id);
  if(!proj) return res.status(404).json({ error: 'project not found' });
  if(proj.status !== 'Pending') return res.status(400).json({ error: 'not pending' });
  proj.status = 'Verified';
  const tx = mockCreateProject(proj);
  const mint = mockMint(proj, 100);
  proj.mock_tx_hash = tx.txHash;
  writeDB(db);
  res.json({ ok:true, tx, mint, project: proj });
});

router.get('/marketplace', (req, res) => {
  try {
    const marketplaceDataPath = path.join(__dirname, '../marketplace.json');
    let marketplaceData = [];
    
    console.log('Marketplace API called - looking for file at:', marketplaceDataPath);
    
    if (fs.existsSync(marketplaceDataPath)) {
      console.log('File exists, reading content');
      const fileContent = fs.readFileSync(marketplaceDataPath, 'utf8');
      marketplaceData = JSON.parse(fileContent);
      console.log('Parsed JSON data, returning', marketplaceData.length, 'projects');
    } else {
      console.log('File does not exist at path:', marketplaceDataPath);
    }
    
    res.json(marketplaceData);
  } catch (err) {
    console.error('Error serving marketplace data:', err);
    res.status(500).json({ error: 'Failed to retrieve marketplace data' });
  }
});

export default router;
