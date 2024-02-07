import { EditedItems } from '../hooks/use-edit'

export type PublishParams = EditedItems
export type UpdateParams = EditedItems & { _id: string }
