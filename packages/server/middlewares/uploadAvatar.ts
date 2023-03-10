import type { Response, NextFunction } from 'express';
import path from 'path';
import fs from 'fs/promises';
import multer, { FileFilterCallback } from 'multer';
import sharp from 'sharp';
import { v4 as uuidv4 } from 'uuid';
import type { TUserRequest } from '../types/user';


// Создаем хранилище и присваиваем имя загруженному файлу
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

// Проверяем, что файл формата jpg/jpeg или png
const fileFilter = (
  _req: TUserRequest, 
  file: Express.Multer.File, 
  cb: FileFilterCallback
) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

// Создаем мидлвар multer
const upload = multer({
  storage: storage,
  fileFilter: fileFilter
});

// Мидлвар для загрузки на сервер
const uploadAvatar = async (req: TUserRequest, res: Response, next: NextFunction) => {
  try {
    
    if (!req.file) {
      res
        .status(400)
        .json({ message: 'Please upload an image' });
      return;
    }

    // Меняем название файла для библиотеки sharp
    // имена входящего файла и выходящего не должны совпадать
    const outputFileName = 'av-' + req.file.filename;
    const outputFilePath = path.join(__dirname, '..', 'resources', outputFileName);

    // Сжимаем изображение
    await sharp(req.file.path)
      .resize({ width: 500 })
      .jpeg({ quality: 90 })
      .toFile(outputFilePath);

    
    // Удаляем из памяти исходное изображение
    await fs.unlink(req.file.path);

    // Передаем название файла дальше
    if (req.user) {
      req.user.avatar = outputFileName;
    }
    
    next();
    
  } catch (error) {
    res
      .status(500)
      .json({'reason': `${error}`})
  }
};

export { upload, uploadAvatar };

