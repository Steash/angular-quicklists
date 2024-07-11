import { Injectable, computed, effect, inject, signal } from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { Subject, catchError, concatMap } from 'rxjs'
import { AddChecklist, Checklist, EditChecklist } from '../interfaces/checklist'
import { StorageService } from './storage.service';
import { ChecklistItemService } from '../../checklist/data-access/checklist-item.service';
import { HttpClient } from '@angular/common/http';

export interface ChecklistsState {
  checklists: Checklist[]
  loaded: boolean
  error: string | null
}

@Injectable({ providedIn: 'root' })
export class ChecklistService {
  storageService = inject(StorageService)
  checklistItemService = inject(ChecklistItemService)
  // http = inject(HttpClient)

  // state
  private state = signal<ChecklistsState>({
    checklists: [],
    loaded: false,
    error: null
  })

  // selectors
  checklists = computed(() => this.state().checklists)
  loaded = computed(() => this.state().loaded)

  // sources
  add$ = new Subject<AddChecklist>()
  edit$ = new Subject<EditChecklist>()
  remove$ = this.checklistItemService.checklistRemoved$
  private checklistsLoaded$ = this.storageService.loadChecklists()
  // private checklistsLoaded$ = this.http
  //   .get<Checklist[]>(`${environment.API_URL}/checklists`)
  //   .pipe(catchError((err) => this.handleError(err)))


  constructor() {
    // // reducers
    // this.checklistsLoaded$.pipe(takeUntilDestroyed()).subscribe((checklists) =>
    //   this.state.update((state) => ({
    //     ...state,
    //     checklists,
    //     loaded: true
    //   }))
    // )

    this.checklistsLoaded$.pipe(takeUntilDestroyed()).subscribe({
      next: (checklists) =>
        this.state.update((state) => ({
          ...state,
          checklists,
          loaded: true
        })),
      error: (err) => this.state.update((state) => ({ ...state, error: err }))
    })

    this.add$.pipe(takeUntilDestroyed()).subscribe((checklist) =>
      this.state.update((state) => ({
        ...state,
        checklists: [...state.checklists, this.addIdToChecklist(checklist)]
      }))
    )

    // this.add$
    //   .pipe(
    //     concatMap((addCheckList) =>
    //       this.http
    //         .post(`${environent.API_URL}/checklists`, JSON.stringify(addCheckList))
    //         .pipe(catchError((err) => this.handleError(err)))
    //     ),
    //     takeUntilDestroyed()
    //   )
    //   .subscribe()

    this.edit$.pipe(takeUntilDestroyed()).subscribe((update) =>
      this.state.update((state) => ({
        ...state,
        checklists: state.checklists.map((checklist) =>
          checklist.id === update.id
            ? { ...checklist, title: update.data.title }
            : checklist
        )
      }))
    )

    this.remove$.pipe(takeUntilDestroyed()).subscribe((id) =>
      this.state.update((state) => ({
        ...state,
        checklists: state.checklists.filter(checklist => checklist.id !== id)
      }))
    )

    // effects
    effect(() => {
      if (this.loaded()) {
        this.storageService.saveChecklists(this.checklists())
      }
    })
  }

  private addIdToChecklist(checklist: AddChecklist) {
    return {
      ...checklist,
      id: this.generateSlug(checklist.title)
    }
  }

  private generateSlug(title: string) {
    // NOTE: This is a simplistic slug generator and will not handle things like special characters.
    let slug = title.toLowerCase().replace(/\s+/g, '-')

    // Check if the slug already exists
    const matchingSlugs = this.checklists().find(
      (checklist) => checklist.id === slug
    )

    // If the title is already being used, add a string to make the slug unique
    if (matchingSlugs) {
      slug = slug + Date.now().toString()
    }

    return slug
  }

  // private handleError(error: Error) {

  // }
}
