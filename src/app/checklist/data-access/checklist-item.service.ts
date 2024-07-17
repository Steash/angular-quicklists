import { Injectable, computed, effect, inject, signal } from "@angular/core";
import { AddChecklistItem, ChecklistItem, EditChecklistItem, RemoveChecklistItem, ToggleChecklistItem } from "../../shared/interfaces/checklist-item";
import { Subject } from "rxjs";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { StorageService } from "../../shared/data-access/storage.service";
import { RemoveChecklist } from "../../shared/interfaces/checklist";


export interface ChecklistItemsState {
  checklistItems: ChecklistItem[]
  loaded: boolean
  error: string | null
}

@Injectable({
  providedIn: 'root'
})
export class ChecklistItemService {
  storageService = inject(StorageService)

  // state
  private state = signal<ChecklistItemsState>({
    checklistItems: [],
    loaded: false,
    error: null
  })

  // selectors
  checklistItems = computed(() => this.state().checklistItems)
  loaded = computed(() => this.state().loaded)

  // sources
  add$ = new Subject<AddChecklistItem>()
  edit$ = new Subject<EditChecklistItem>()
  remove$ = new Subject<RemoveChecklistItem>()
  checklistRemoved$ = new Subject<RemoveChecklist>()
  toggle$ = new Subject<ToggleChecklistItem>()
  reset$ = new Subject<ToggleChecklistItem>()
  private checklistItemsLoaded$ = this.storageService.loadChecklistItems()


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
            checked: false,
            creationDate: new Date()
          }
        ]
      }))
    )

    this.edit$.pipe(takeUntilDestroyed()).subscribe((update) =>
      this.state.update((state) => ({
        ...state,
        checklistItems: state.checklistItems.map((item) =>
          item.id === update.id
            ? { ...item, title: update.data.title }
            : item
        )
      }))
    )

    this.remove$.pipe(takeUntilDestroyed()).subscribe((id) =>
      this.state.update((state) => ({
        ...state,
        checklistItems: state.checklistItems.filter(item => item.id !== id)
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

    this.checklistRemoved$.pipe(takeUntilDestroyed()).subscribe((checklistId) =>
      this.state.update((state) => ({
        ...state,
        checklistItems: state.checklistItems.filter(
          (item) => item.checklistId !== checklistId
        )
      }))
    )

    this.checklistItemsLoaded$.pipe(takeUntilDestroyed()).subscribe({
      next: (checklistItems) =>
        this.state.update((state) => ({
          ...state,
          checklistItems,
          loaded: true
        })),
      error: (err) => this.state.update((state) => ({ ...state, error: err }))
    })

    // effects
    effect(() => {
      if (this.loaded()) {
        this.storageService.saveChecklistItems(this.checklistItems())
      }
    })
  }
}
