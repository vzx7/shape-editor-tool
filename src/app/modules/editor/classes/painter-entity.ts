import { D3Base } from 'modules/shared/classes/d3Base';
import { ObjectType } from 'modules/shared/enums/object-type.enum';
import { EditorMode } from 'modules/shared/enums/editor-mode.enum';
import { EditorStateService } from 'modules/shared/services/editor-state/editor-state.service';
import { Vector } from 'modules/shared/interfaces/geometry/vector';

export class PainterEntity extends D3Base {
  /**
   * Радиус для промежуточных точек.
   */
  protected readonly intermediatePointRadius: number = 6;
  /**
   * Радиус для основных точек
   */
  protected readonly radiusPoint: number = 8;
  /**
   * Тип создаваемого обекта.
   */
  protected objectType: ObjectType;
  /**
   * Id редактируемого объетоа.
   */
  protected objectId: string;
  /**
   * режим редактора.
   */
  protected editorMode: EditorMode;
  /**
   * Метод для построения полигона.
   */
  protected readonly lineFunction: Function = this.d3.line();
  /**
   * Происходит ли событие перетаскивание для узла.
   */
  protected dragging: boolean;
  /**
   * Происходит ли событие рисования.
   */
  protected drawing: boolean;
  /**
   * Начальная точка рисования объекта.
   */
  protected drawStartPoint: Vector;
  /**
   * слой group в svg контейнере.
   */
  protected groupLayer: any;

  /**
   * Массив точек редактируемого полигона.
   */
  protected editablePolygonPoints: Vector[] = [];

  /**
   * Делемитер для деления (получение четного значения и середины по осям).
   */
  protected readonly delimiter: number = 2;

  /**
   * Сдвиг индекса массива точек на один (последний элемент  массива)
   */
  protected readonly shiftByOne: number = 1;

  constructor(
    protected readonly editorStateService: EditorStateService
  ) {
    super();
  }

  /**
   * Эмитируем конец создания или редактирования объекта.
   * @param uuid ID идентифиактор объекта.
   */
  protected createOrEditFinishEmit(uuid: string): void {
    this.editorStateService.createHandler.emit({
      id: uuid,
      objectType: this.objectType
    });
  }
}
