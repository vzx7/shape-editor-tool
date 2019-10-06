import { Vector } from 'modules/shared/interfaces/geometry/vector';
import { Injectable } from '@angular/core';
import { Polygon } from 'modules/shared/interfaces/geometry/polygon';

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
}
