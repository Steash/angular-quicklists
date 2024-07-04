import { Injectable, computed, signal } from "@angular/core";
import { AddChecklistItem, ChecklistItem, RemoveChecklistItem, ToggleChecklistItem } from "../../shared/interfaces/checklist-item";
import { Subject } from "rxjs";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";


export interface ChecklistItemsState {
    checklistItems: ChecklistItem[]
}

@Injectable({
    providedIn: 'root'
})
export class ChecklistItemService {
    // state
    private state = signal<ChecklistItemsState>({
        checklistItems: []
    })

    // selectors
    checklistItems = computed(() => this.state().checklistItems)

    // sources
    add$ = new Subject<AddChecklistItem>()
    toggle$ = new Subject<ToggleChecklistItem>()
    reset$ = new Subject<ToggleChecklistItem>()

    constructor() {
        // reducers
        this.add$.pipe(takeUntilDestroyed()).subscribe((checklistItem) =>
            this.state.update((state) => ({
                ...state,
                checklistItems: [
                    ...state.checklistItems,
                    {
                        ...checklistItem.item,
                        id: Date.now().toString(),
                        checklistId: checklistItem.checklistId,
                        checked: false
                    }
                ]
            }))
        )

        this.toggle$.pipe(takeUntilDestroyed()).subscribe((checklistItemId) => 
            this.state.update((state) => ({
                ...state,
                checklistItems: state.checklistItems.map((item) =>
                item.id === checklistItemId
                    ? { ...item, checked: !item.checked }
                    : item
                )
            }))
        )

        this.reset$.pipe(takeUntilDestroyed()).subscribe((checklistId) =>
            this.state.update((state) => ({
                ...state,
                checklistItems: state.checklistItems.map((item) =>
                item.checklistId === checklistId 
                    ? { ...item, checked: false }
                    : item
                )
            }))
        )
    }
}