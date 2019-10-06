import { EventEmitter, Injectable } from '@angular/core';
import { D3Base } from 'modules/shared/classes/d3Base';
import { Polygon } from 'modules/shared/interfaces/geometry/polygon';
import { ViewBox } from 'modules/shared/interfaces/geometry/view-box';
import {
  TransformationHelperService
} from 'modules/shared/services/transformation-helper/transformation-helper.service';
import { Vector } from 'modules/shared/interfaces/geometry/vector';
import { Stand } from 'modules/shared/interfaces/schema/stand';
import { StorageService } from 'modules/shared/services/storage/storage.service';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { ObjectType } from 'modules/shared/enums/object-type.enum';
import { SelectAreaService } from 'modules/shared/services/select-area/select-area.service';

/**
 * Сервис для массового выделения объектов.
 */
@Injectable()
export class MultiSelectService extends D3Base {

  /**
   * Событие выбора стендов
   */
  public standsSelected: EventEmitter<Stand[]>;

  /**
   * Событие удаления стендов
   */
  public standsDeleted: EventEmitter<Stand[]>;

  /**
   * Выбранные стенды
   */
  public selectedStands: Stand[];

  /**
   * Тип сущности
   */
  public standType: ObjectType.Stand;

  /**
   * Параметры выбранной области.
   */
  private selctedAreaParams: ViewBox;

  constructor(
    public ngxSmartModalService: NgxSmartModalService,
    private readonly selectAreaService: SelectAreaService,
    private readonly transformationHelperService: TransformationHelperService,
    public readonly storageService: StorageService
  ) {
    super();
    this.standsSelected = new EventEmitter<any>();
    this.standsDeleted = new EventEmitter<any>();
    this.standType = ObjectType.Stand;
  }

  /**
   * Активация инструмента.
   */
  public activate(): void {
    this.selectAreaService.enableSelectArea(
      (realMousePos: Vector, startMousePosition: Vector, viewBox: ViewBox) => {
        this.selctedAreaParams = viewBox;
        this.selectStands();
      },
      this.removeSelected
    );
  }

  /**
   * Деактивация инструмента.
   */
  public deactivate(): void {
    this.selectAreaService.disableSelectArea();
    this.removeSelected();
    super.killEventHandlers(['mousedown', 'mousemove', 'mouseup', 'mouseout']);
  }

  /**
   * Удаление стендов
   * @param stands Выбранные стенды
   */
  public deleteStands(stands: Stand[]): void {
    /**
     * const body = [];
     */
    stands.forEach((stand) => {
      /**
       * body.push(stand.id);
       */
      this.storageService.removeObject(this.standType, stand.id);
    });
    /**
     * this.requestService.post(routes.api.delete, body);
     */

    // TODO раскоментить, когда будет готов бэк
    this.standsDeleted.emit(stands);
  }

  /**
   * Удалить выделение.
   */
  private removeSelected(): void {
    this.d3.selectAll('path.selected').classed('selected', false);
  }

  /**
   * Метод для получения стендов которые входят в область выделения.
   * @return Stand[]
   */
  private getInnerStands(): Stand[] {
    const stands = this.storageService.schema.halls[0].stands;

    return stands.filter((item) => {
      const firstPoint = item.geometry.bound[0];
      const leftTop = this.getTransformVector(item.geometry, { x: firstPoint.x, y: firstPoint.y });

      return leftTop.x >= this.selctedAreaParams.position.x;
    });

  }

  /**
   * Метоод для получения точки с трансформацией.
   * @param geometry Polygon
   * @param point Vector точка
   * @return Vector
   */
  private getTransformVector(geometry: Polygon, point: Vector): Vector {
    const transformationVector = this.transformationHelperService.getTranslation(geometry);

    return this.transformationHelperService.addVector(point, transformationVector);
  }

  /**
   * Метод для выбора объектов находящихся в выделение.
   * @param rectSelection не реализовано
   * @param areaParams не реализовано
   */
  private selectStands(): void {
    if (!this.selctedAreaParams) {
      return;
    }

    const preInnerStands = this.getInnerStands();
    const innerStands: Stand[] = [];

    preInnerStands.forEach((stand) => {
      const node = this.d3.select(`g[data-id="${stand.id}"] path`);
      const nodeGeometry = stand.geometry as Polygon;

      const xMin = Math.min(...nodeGeometry.bound.map((v) => v.x));
      const yMin = Math.min(...nodeGeometry.bound.map((v) => v.y));
      const leftTop = this.getTransformVector(nodeGeometry, { x: xMin, y: yMin });

      const xMax = Math.max(...nodeGeometry.bound.map((v) => v.x));
      const yMax = Math.max(...nodeGeometry.bound.map((v) => v.y));
      const rightBottom = this.getTransformVector(nodeGeometry, { x: xMax, y: yMax });

      if (
        !node.classed('selected')
        // inner path inside selection frame
        && leftTop.x >= this.selctedAreaParams.position.x
        && rightBottom.x <= this.selctedAreaParams.position.x + this.selctedAreaParams.width
        && leftTop.y >= this.selctedAreaParams.position.y
        && rightBottom.y <= this.selctedAreaParams.position.y + this.selctedAreaParams.height
      ) {
        node.classed('selected', true);
        innerStands.push(stand);
      }
    });

    if (innerStands.length > 0) {
      this.standsSelected.emit(innerStands);
    }
  }
}
