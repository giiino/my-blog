import { EditedItems } from '../hooks/use-categories'

export type PublishParams = EditedItems
export type UpdateParams = EditedItems & { id: string }
