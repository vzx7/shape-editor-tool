import { Rotation } from '../../interfaces/geometry/rotation';
import { GeometryBase } from '../../interfaces/geometry/geometry-base';
import { Injectable } from '@angular/core';
import { Vector } from 'modules/shared/interfaces/geometry/vector';

@Injectable()
export class TransformationHelperService {
  constructor() {}

  /**
   * Генерирует трансформацию для геометрии.
   * @param geom Геометрия.
   * @return Текстовое значение трансформации для SVG.
   */
  public generateTransformation(geom: GeometryBase): string {
    let res = '';
    if (!geom.transformation) {
      return null;
    }

    const transform = geom.transformation;
    if (transform.translation) {
      const t = transform.translation;
      res = `translate(${t.x} ${t.y})`;
    }

    if (transform.rotation) {
      const r = transform.rotation;
      res = `${res}rotate(${r.angle} ${r.point.x} ${r.point.y})`;
    }

    if (res.length === 0) {
      res = null;
    }

    return res;
  }

  /**
   * Получение смещения для геометрии.
   * @param geom Геометрия.
   * @return Вектор смещения.
   */
  public getTranslation(geom: GeometryBase): Vector {
    if (geom.transformation && geom.transformation.translation) {
      return geom.transformation.translation;
    }

    return { x: 0, y: 0 };
  }

  /**
   * Установка смещения для геометрии.
   * @param geom Геометрия.
   * @param vector Вектор смещения.
   */
  public setTranslation(geom: GeometryBase, vector: Vector): void {
    if (!geom.transformation) {
      geom.transformation = {};
    }

    geom.transformation.translation = vector;
  }

  /**
   * Получение вращения для геометрии.
   * @param geom Геометрия.
   * @return Настройки вращения.
   */
  public getRotation(geom: GeometryBase): Rotation {
    if (geom.transformation && geom.transformation.rotation) {
      return geom.transformation.rotation;
    }

    return { angle: 0, point: { x: 0, y: 0 } };
  }

  /**
   * Проверка, задано ли в геометрии вращение.
   * @param geom Геометрия.
   * @return Истину, если вращение задано.
   */
  public hasRotation(geom: GeometryBase): boolean {
    if (geom.transformation && geom.transformation.rotation) {
      return true;
    }

    return false;
  }

  /**
   * Установка вращения для геометрии.
   * @param geom Геометрия.
   * @param rotation Настройки вращения.
   */
  public setRotation(geom: GeometryBase, rotation: Rotation): void {
    if (!geom.transformation) {
      geom.transformation = {};
    }

    geom.transformation.rotation = rotation;
  }

  /**
   * Вычисление угла между векторами.
   * @param v1 Вектор 1.
   * @param v2 Вектор 2.
   * @return Значение угла в градусах.
   */
  public calcAngleBetweenVectors(v1: Vector, v2: Vector): number {
    return this.calcAngleBetweenVectorAndOX(v1) - this.calcAngleBetweenVectorAndOX(v2);
  }

  /**
   * Поворот вектора на указанный угол.
   * @param v Вектор.
   * @param angle Угол поворота в градусах.
   * @return Результирующий вектор.
   */
  public rotateVector(v: Vector, angle: number): Vector {
    const aRad = this.degToRad(angle);
    const x1 = v.x * Math.cos(aRad) - v.y * Math.sin(aRad);
    const y1 = v.x * Math.sin(aRad) + v.y * Math.cos(aRad);

    return { x: x1, y: y1 };
  }

  /**
   * Нахождение азимута вектора (угол между вектором и направлением севера).
   * @param v Вектор.
   * @return Угол в градусах.
   */
  public calcAzimuth(v: Vector): number {
    return this.calcAngleBetweenVectors(v, { x: 0, y: -1 });
  }

  /**
   * Нахождение угла между вектором и осью X.
   * @param v Вектор.
   * @return Угол в градусах.
   */
  public calcAngleBetweenVectorAndOX(v: Vector): number {
    return this.radToDeg(Math.atan2(v.y, v.x));
  }

  /**
   * Вычисления модуля вектора.
   * @param v Вектор.
   * @return Значение модуля.
   */
  public calcVectorModule(v: Vector): number {
    const squareMultiplier = 2;

    return Math.sqrt(v.x ** squareMultiplier + v.y ** squareMultiplier);
  }

  /**
   * Умножение векторов.
   * @param v1 Вектор 1.
   * @param v2 Вектор 2.
   * @return Значение умножения векторов.
   */
  public calcMultimplicateVectors(v1: Vector, v2: Vector): number {
    return v1.x * v2.x + v1.y * v2.y;
  }

  /**
   * Конвертация радиан в градусы.
   * @param rad угол в радианах.
   * @return угол в градусах.
   */
  public radToDeg(rad: number): number {
    const flatAngle = 180;

    return rad / Math.PI * flatAngle;
  }

  /**
   * Конвертация градусов в радианы.
   * @param deg угол в градусах.
   * @return угол в радианах.
   */
  public degToRad(deg: number): number {
    const flatAngle = 180;

    return deg / flatAngle * Math.PI;
  }

  /**
   * Изменение центра вращения для геометрии.
   * @param geom геометрия.
   * @param center новый центр.
   */
  public setRotationCenter(geom: GeometryBase, center: Vector): void {
    // Если у геометрии не задана трансформация, выходим.
    if (!geom.transformation) {
      return;
    }

    // Если у геометрии не задано вращение, выходим.
    if (!geom.transformation.rotation) {
      return;
    }

    // Если угол вращения нулевой, просто убираем вращение.
    const maxDeg = 360;
    const rotation = this.getRotation(geom);
    if (rotation.angle % maxDeg === 0) {
      geom.transformation.rotation = null;

      return;
    }

    // Получаем смещение геометрии.
    const translation = this.getTranslation(geom);

    // Находим вектор смещения центра вращения.
    const centerOffset = this.decrVector(center, rotation.point);

    // Поворачиваем вектор смещения центра на текущий угол вращения.
    const rotatedOffset = this.rotateVector(centerOffset, rotation.angle);

    // Находим вектор для смещения смещения :)
    const translationOffset = this.decrVector(rotatedOffset, centerOffset);

    // Вычисляем новое смещение для геометрии.
    const newTransl = this.addVector(translation, translationOffset);

    // Устанавливаем новый центр вращения.
    const newRotation: Rotation = { angle: rotation.angle, point: center};

    // Применяем полученную геометрию.
    geom.transformation = { translation: newTransl, rotation: newRotation };
  }

  /**
   * Сложение векторов.
   * @param v1 Вектор 1.
   * @param v2 Вектор 2.
   * @return Результирующий вектор.
   */
  public addVector(v1: Vector, v2: Vector): Vector {
    const x = v1.x + v2.x;
    const y = v1.y + v2.y;

    return { x, y };
  }

  /**
   * Разность векторов.
   * @param v1 Вектор, от которого отнимаем.
   * @param v2 Вектор, который отнимаем.
   * @return Результирующий вектор.
   */
  public decrVector(v1: Vector, v2: Vector): Vector {
    const x = v1.x - v2.x;
    const y = v1.y - v2.y;

    return { x, y };
  }
}
