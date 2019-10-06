import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AutocadLayersService {

  public isLayersActive: EventEmitter<boolean>;

  constructor() {
    this.isLayersActive = new EventEmitter<boolean>();
  }
}
