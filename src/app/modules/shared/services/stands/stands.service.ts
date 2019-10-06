import { EventEmitter, Injectable } from '@angular/core';
import { D3Base } from 'modules/shared/classes/d3Base';
import { ObjectsHostService } from '../objects-host/objects-host.service';
import { Polygon } from 'modules/shared/interfaces/geometry/polygon';

/**
 * Сервис для работы со стендами.
 */
@Injectable()
export class StandsService extends D3Base {

  /**
   * Событие открытие списка стендов
   */
  public isActivated: EventEmitter<boolean>;

  constructor(
    private readonly objectsHost: ObjectsHostService
  ) {
    super();
    this.isActivated = new EventEmitter<boolean>();
  }

  /**
   * Получить площадь стенда.
   * @param standId ID стенда.
   * @return number.
   */
  public getSquareStand(standId: string): number {
    if (!standId) { return; }
    const polygon = <SVGPathElement>this.d3.select(`path#${standId}`).node();
    const node = this.objectsHost.getObjectNode(polygon);
    const obj = this.objectsHost.getObject(node);
    let geometry: Polygon;
    if (obj) {
      geometry = <Polygon>obj.geometry;
    }

    let square = Math.abs(this.d3.polygonArea(<[number, number][]>geometry.bound.map((v) => [ v.x, v.y ])));

    if (geometry.holes) {
      geometry.holes.forEach((hole) => {
        square -= Math.abs(this.d3.polygonArea(<[number, number][]>hole.map((v) => [ v.x, v.y ])));
      });
    }

    return square ? square : 0;
  }
}
