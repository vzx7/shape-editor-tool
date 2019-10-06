/**
 * CSS классы для работы с сервисами редактора.
 */
export enum EditorСSSClasses {
  /**
   * Класс для вспомогательных точек.
   */
  IntermediatePoint = 'intermediate-point',
  /**
   * Класс для полигона.
   */
  PolygonEditArea = 'polygon-edit-area',
  /**
   * Класс для перетасивания полигона.
   */
  DrawPolygon = 'draw-polygon',
  /**
   * Класс для основных точек.
   */
  MainPoint = 'main-point',
  /**
   * Класс для опорных точек
   */
  PivotPointLayer = 'pivot-point-layer',
  /**
   * Класс для редактируемых слоев
   */
  EditableLayer = 'editable-layer',
  /**
   * Класс для одного редактируемого полигона.
   */
  OneEditableLayer = 'one-editable-layer',
  /**
   * Класс для новых полигонов
   */
  NewPolygon = 'new-polygon',
  /**
   * Класс для перемещаемых элементов
   */
  MoveableElement = 'moveable',
  /**
   * Класс для вращаемого элемента.
   */
  RotatableElement = 'rotatable',
  /**
   * Класс временного слоя для создания полигона.
   */
  TmpLayer = 'tmp-layer',
  /**
   * Класс добавляемый при создание внутреннего контура.
   */
  CreateHoleActive = 'create-hole-active'
}
