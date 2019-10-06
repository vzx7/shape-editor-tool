/**
 * ID Модалов в системе
 */
export enum ModalName {
  /**
   * Модал списка стендов.
   */
  StandList = 'stand-list',

  /**
   * Модал списка информации по стенду (из иснтрумента стенды).
   */
  StandInfo = 'stand-info-list',

  /**
   * Модал создания стенда.
   */
  CreateStand = 'create-stand',

  /**
   * Модал списка стендов для мультивыбора.
   */
  MultiSelect = 'multi-select',

  /**
   * Модал информации о стенде для мультивыбора.
   */
  MultiSelectInfo = 'multi-select-info',

  /**
   * Модал слоев Автокада
   */
  AutoCADLayers = 'auto-cad-layers',
  /**
   * Модал слоев рабочей схемы
   */
  Layers = 'layers-modal',

  /**
   * Модал слоев рабочей схемы
   */
  Pavilions = 'pavilions-modal'
}
