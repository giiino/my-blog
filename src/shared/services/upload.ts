import Compressor from 'compressorjs'

import { axiosInstance } from '../utils/axios-instance'

export const uploadImage = (file: File | Blob) => {
  return new Promise<string>(async (resolve, reject) => {
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
    resolve(res.data.data.url)
  })
}

export const uploadCompressImage = (file: File | Blob) => {
  return new Promise<string>(async (resolve, reject) => {
    new Compressor(file, {
      quality: 0.1,
      maxWidth: 10,
      maxHeight: 10,
      success(result) {
        uploadImage(result).then((url) => {
          resolve(url)
        })
      },
      error(err) {
        console.log(err.message)
      }
    })
  })
}
