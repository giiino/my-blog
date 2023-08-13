import { EditedItems } from '../hooks/useEdit'

export type PublishParams = EditedItems
export type UpdateParams = EditedItems & { _id: string }
