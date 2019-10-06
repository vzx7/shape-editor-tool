import { Injectable } from '@angular/core';
import { Vector } from 'modules/shared/interfaces/geometry/vector';

/**
 * Хелпер для взаимодействия с нативными свойствами SVG.
 */
@Injectable()
export class SvgNativeHelperService {

  constructor() { }

  /**
   * Метод для получения реальных координат точник.
   * @param target Целевой элемент геометрии.
   * @param point Координаты точки.
   * @return Vector
   */
  public getPointTransformation(target: SVGGraphicsElement , point: Vector): Vector {
    const tmpSvg = target.ownerSVGElement;
    const pt = tmpSvg.createSVGPoint();
    pt.x = point.x;
    pt.y = point.y;
    const coordinate = pt.matrixTransform(target.getCTM());

    return {
      x: coordinate.x,
      y: coordinate.y
    };
  }

  /**
   * Преобразовать координаты экрана в координаты SVG.
   * @param v Координаты экрана.
   * @param svgEl элемент SVG.
   * @return Преоразованный вектор.
   */
  public getRealVector(v: Vector, svgEl: SVGGraphicsElement): Vector {
    let point = svgEl.ownerSVGElement.createSVGPoint();
    point.x = v.x;
    point.y = v.y;
    point = point.matrixTransform(svgEl.ownerSVGElement.getScreenCTM().inverse());

    return { x: point.x, y: point.y };
  }
}
