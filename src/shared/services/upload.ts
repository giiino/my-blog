import { UploadedImageInfo } from '../types/api/upload'
import { axiosInstance } from '../utils/axios-instance'

export const uploadImage = (file: File | Blob) => {
  return new Promise<UploadedImageInfo>(async (resolve) => {
    const formData = new FormData()
    formData.append('image', file)
    const res = await axiosInstance.post(
      'https://api.imgbb.com/1/upload',
      formData,
      {
        params: {
          key: process.env.NEXT_PUBLIC_IMGBB_KEY
        },
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    )
    resolve(res.data.data)
  })
}
