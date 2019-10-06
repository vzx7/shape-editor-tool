import { EventEmitter, Injectable } from '@angular/core';
import { EditorState } from 'modules/shared/interfaces/editor/editor-state';
import { CreatedObject } from 'modules/shared/interfaces/editor/created-object';

/**
 * Сервис для хранения данных редактора.
 */
@Injectable()
export class EditorStateService {
  /**
   * Эмитор состояния редактора.
   */
  public modeHandler: EventEmitter<EditorState>;

  /**
   * Эмитор создания элемента.
   */
  public createHandler: EventEmitter<CreatedObject>;

  constructor(  ) {
    this.modeHandler = new EventEmitter<EditorState>();
    this.createHandler = new EventEmitter<CreatedObject>();
  }
}
