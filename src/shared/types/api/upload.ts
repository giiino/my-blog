interface ImageData {
  filename: string
  name: string
  mime: string
  extension: string
  url: string
}

export interface UploadedImageInfo {
  id: string
  title: string
  url_viewer: string
  url: string
  display_url: string
  width: number
  height: number
  size: number
  time: number
  expiration: number
  image: ImageData
  thumb: ImageData
}
