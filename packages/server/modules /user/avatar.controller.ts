import type { Request, Response } from 'express';
import path from 'path';
import fs from 'fs/promises';
import multer, { FileFilterCallback } from 'multer';
import sharp from 'sharp';
import { v4 as uuidv4 } from 'uuid';

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, 'resources/');
  },
  filename: (_req, file, cb) => {
    const origName = Buffer.from(file.originalname, 'latin1').toString('utf8')
    const uniqueName = `${uuidv4()}-${origName}`;
    cb(null, uniqueName);
  }
});

const fileFilter = (
  _req: Request, 
  file: Express.Multer.File, 
  cb: FileFilterCallback
) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter
});

const uploadAvatar = async (req: Request, res: Response) => {
  try {
    
    if (!req.file) {
      return res
        .status(400)
        .json({ message: 'Please upload an image' });
    }

    const outputFileName = 'r-' + req.file.filename;
    const outputFilePath = path.join(__dirname, '../..', 'resources', outputFileName);

    await sharp(req.file.path)
      .resize({ width: 500 })
      .jpeg({ quality: 90 })
      .toFile(outputFilePath);

    
    await fs.unlink(req.file.path);

    return res
      .status(200)
      .json({ avatar: `${outputFileName}` });
  } catch (error) {
    return res
      .status(500)
      .json({'reason': `${error}`})
  }
};

export { upload, uploadAvatar };

