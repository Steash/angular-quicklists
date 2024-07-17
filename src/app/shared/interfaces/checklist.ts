export interface Checklist {
  id: string
  title: string
  creationDate: Date
  description?: string // Optional field
  endDate?: Date | null // Optional field
}

export type AddChecklist = Omit<Checklist, 'id'| 'creationDate'>
export type EditChecklist = { id: Checklist['id']; data: AddChecklist }
export type RemoveChecklist = Checklist['id']
export type ResetChecklist = Checklist['id']
