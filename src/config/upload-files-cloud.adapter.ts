import { utilsFirebase } from './firebase.adapter';
import { generateUUID } from './genereta-uuid.adapter';



export class UploadFile {

  static async uploadToCloud(path: string, data: Buffer): Promise<string>{
      const imgRef = utilsFirebase.ref(
        utilsFirebase.storage,
        path
      )

      await utilsFirebase.uploadBytes(imgRef, data) 

      return await utilsFirebase.getDownloadURL(imgRef)
  }

  static async uploadMultipleFilesToFirebase(
    path: string, 
    filesData: Express.Multer.File[]
  ): Promise<string[]>{
    const uploadPromises = filesData.map(async({ originalname, buffer }) => {

      const filePath = `${path}/${generateUUID()}-${originalname}`;

      const imgRef = utilsFirebase.ref( utilsFirebase.storage, filePath);

      await utilsFirebase.uploadBytes(imgRef, buffer)

      return await utilsFirebase.getDownloadURL(imgRef)
    })

    return await Promise.all(uploadPromises)
  } 

}





