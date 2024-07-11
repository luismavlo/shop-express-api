import multer from 'multer';

const storage = multer.memoryStorage();

// const upload = multer({ storage, fileFilter: (request, file, cb) => {
//   if (file.mimetype == "image/jpeg" ) {
//       cb(null, true);
//       } else {
//           cb(null, false);
//           return cb(new Error('Only .pdf format allowed!'));
//       }
//   } });

const upload = multer({ storage });

export const uploadSingle = ( filename: string ) => upload.single(filename); //la informacion viene por req.file

export const uploadArr = (filename: string, maxFileNumber: number) => upload.array(filename, maxFileNumber); //la informacion viene por req.files


