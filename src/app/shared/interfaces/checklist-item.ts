import { RemoveChecklist } from "./checklist";

export interface ChecklistItem {
  id: string
  checklistId: string
  title: string
  checked: boolean
  creationDate: Date
  endDate?: Date | null
  description?: string
}

export type AddChecklistItem = {
  item: Omit<ChecklistItem, 'id' | 'checklistId' | 'checked' | 'creationDate'>
  checklistId: RemoveChecklist
}

export type EditChecklistItem = {
  id: ChecklistItem['id']
  data: AddChecklistItem['item']
}

export type RemoveChecklistItem = ChecklistItem['id']

export type ToggleChecklistItem = ChecklistItem['id']
