import { Vector } from 'modules/shared/interfaces/geometry/vector';
import { Injectable } from '@angular/core';
import { Polygon } from 'modules/shared/interfaces/geometry/polygon';
import { ViewBox } from 'modules/shared/interfaces/geometry/view-box';

/**
 * Сервис для слжебных функций не меняющих контекст.
 */
@Injectable()
export class UtilitesService {

  constructor() { }

  /**
   * Метод для получения рандомного цвета.
   * @param factor множитель для получения строки кода.
   * @return string.
   */
  public getRandomColor(factor: number = 16): string {
    const letters = '0123456789ABCDEF'.split('');
    const count = 6;

    let color = '#';

    for (let i = 0; i < count; i++) {
      color += letters[Math.floor(Math.random() * factor)];
    }

    return color;
  }

  /**
   * Метод для генерации коодинат.
   * @param polygon Polygon объект схемы.
   * @return string
   */
  public polygonToPath(polygon: Polygon): string {
    let polygons: Vector[][] = [polygon.bound];
    if (polygon.holes) {
      polygons = polygons.concat(polygon.holes);
    }

    return polygons.map((p) => this.pointsToPolygonPath(p)).join();
  }

  /**
   * Метод для генерации строки для атрибута d.
   * @param points Координаты
   * @return string
   */
  public pointsToPolygonPath(points: Vector[]): string {
    if (points.length === 0) {
      return null;
    }

    let path = points.map((coord) => `L${coord.x},${coord.y}`).join();
    const last = points[points.length - 1];
    path = `M${last.x},${last.y}${path}`;

    return path;
  }

  /**
   * Построение области по двум вершинам.
   * @param v1 одна из вершин.
   * @param v2 другая вершина.
   * @return область.
   */
  public createBBox(v1: Vector, v2: Vector): ViewBox {
    return {
      height: Math.abs(v1.y - v2.y),
      width: Math.abs(v1.x - v2.x),
      position: {
        x: Math.min(v1.x, v2.x),
        y: Math.min(v1.y, v2.y)
      }
    };
  }

  /**
   * Преобразовать координаты экрана в координаты SVG.
   * @param v Координаты экрана.
   * @param svgEl элемент SVG.
   * @return Преоразованный вектор.
   */
  public getRealVector(v: Vector, svgEl: SVGGraphicsElement): Vector {
    const owner = svgEl.ownerSVGElement ? svgEl.ownerSVGElement : svgEl as SVGSVGElement;
    let point = owner.createSVGPoint();
    point.x = v.x;
    point.y = v.y;
    point = point.matrixTransform(owner.getScreenCTM().inverse());

    return { x: point.x, y: point.y };
  }
}
