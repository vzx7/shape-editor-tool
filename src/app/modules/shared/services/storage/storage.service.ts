import { EventEmitter, Injectable } from '@angular/core';
import { Zone } from 'modules/shared/interfaces/schema/zone';
import { Stand } from 'modules/shared/interfaces/schema/stand';
import { Label } from 'modules/shared/interfaces/schema/label';
import { ObjectType } from 'modules/shared/enums/object-type.enum';
import { Hall } from 'modules/shared/interfaces/schema/hall';
import { HallSchema } from 'modules/shared/interfaces/schema/hall-schema';
type GeometryTypes = Zone | Stand | Label;

/**
 * Сервис хранилище, служит транспортом данных для приложения.
 * @todo При необходимости нужно заменить на ngRx.
 */
@Injectable()
export class StorageService {
  /**
   * Рабочая схема или схема участника
   */
  public isWorkingScheme: boolean;

  /**
   * Ширина рабочей обалсти.
   */
  public workAreaWidth: string;

  /**
   * Высота рабочей обалсти.
   */
  public workAreaHeight: string;

  /**
   * Идентификатор павильона
   */
  public hallId: string;

  /**
   * Схема.
   */
  public schema: HallSchema;

  /**
   * Выбор зала/павильона
   */
  public pavilionChosen: EventEmitter<Hall>;

  /**
   * Загрузка актульной схемы павильона.
   */
  public schemaLoaded: EventEmitter<HallSchema>;

  constructor() {
    this.isWorkingScheme = true;
    this.pavilionChosen = new EventEmitter<Hall>();
    this.schemaLoaded = new EventEmitter<HallSchema>();
  }

  /**
   * Метод для настройки базовой высоты и ширины рабочей области.
   * @param width Ширина базового контейнера рабочей области.
   * @param height Высота базового контейнера рабочей области.
   */
  public setWorkAreaSize(width: string, height: string): void {
    this.workAreaWidth = width;
    this.workAreaHeight = height;
  }

  /**
   * Метод для получения объекта схемы.
   * @param type тип объекта.
   * @param objectId id объекта.
   * @return Zone | Stand | Text
   */
  public getObject(type: ObjectType, objectId: string): any {
    return (<GeometryTypes[]>this.schema[type]).find((element: GeometryTypes) => element.id === objectId);
  }

  /**
   * Метоод для добавления нового элемента в схему.
   * @param type Тип объекта.
   * @param element Добавляемый элемент.
   */
  public addObject(type: ObjectType, element: GeometryTypes): void {
    (<GeometryTypes[]>this.schema[type]).push(element);
  }

  /**
   * Удаление объекта из схемы.
   * @param type Тип объекта.
   * @param objectId Id объекта.
   */
  public removeObject(type: ObjectType, objectId: string): void {
    const index = (<GeometryTypes[]>this.schema[type]).findIndex((element: GeometryTypes) => element.id === objectId);
    if (index >= 0) {
      this.schema[type].splice(index, 1);
    }
  }
}
