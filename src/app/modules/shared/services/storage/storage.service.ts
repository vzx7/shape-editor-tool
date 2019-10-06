import { WorkAreaService } from 'modules/shared/services/work-area/work-area.service';
import { EventEmitter, Injectable } from '@angular/core';
import { Zone } from 'modules/shared/interfaces/schema/zone';
import { Stand } from 'modules/shared/interfaces/schema/stand';
import { Schema } from 'modules/shared/interfaces/schema/schema';
import { Label } from 'modules/shared/interfaces/schema/label';
import { ObjectType } from 'modules/shared/enums/object-type.enum';
import { Hall } from 'modules/shared/interfaces/schema/hall';
import { EngineLayer } from 'modules/shared/interfaces/schema/engine-layer';
type GeometryTypes = Zone | Stand | Label;

/**
 * Сервис хранилище, служит транспортом данных для приложения.
 * @todo При необходимости нужно заменить на ngRx.
 */
@Injectable()
export class StorageService {
  /**
   * Ширина рабочей обалсти.
   */
  public workAreaWidth: string;
  /**
   * Выбор зала/павильона
   */
  public pavilionChosen: EventEmitter<Hall>;
  /**
   * Высота рабочей обалсти.
   */
  public workAreaHeight: string;
  /**
   * Схема.
   */
  public schema: Schema;
  /**
   * Идентификатор павильона
   */
  public hallId: string;
  /**
   * Стенды
   */
  public stands: Stand[];
  /**
   * Зоны
   */
  public zones: Zone[];
  /**
   * Лейблы
   */
  public labels: Label[];
  /**
   * Инженерные слои
   */
  public engineLayers: EngineLayer[];

  constructor(private readonly workAreaService: WorkAreaService) {
    this.stands = [];
    this.zones = [];
    this.labels = [];
    this.engineLayers = [];
    this.pavilionChosen = new EventEmitter<Hall>();
    this.pavilionChosen.subscribe((hall: Hall) => {
      this.show(hall);
    });
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
    return this[type.toString()].find((element: GeometryTypes) => element.id === objectId);
  }

  /**
   * Метоод для добавления нового элемента в схему.
   * @param type Тип объекта.
   * @param element Добавляемый элемент.
   */
  public addObject(type: ObjectType, element: any): void {
    switch (type) {
      case ObjectType.Stand:
        this[type].push(element as Stand);
        break;

      case ObjectType.Zone:
        this[type].push(element as Zone);
        break;

      case ObjectType.Text:
        this[type].push(element as Label);
        break;
    }
  }

  /**
   * Удаление объекта из схемы.
   * @param type Тип объекта.
   * @param objectId Id объекта.
   */
  public removeObject(type: string, objectId: string): void {
    this.schema.halls.forEach((hall) => {
      const index = hall[type].findIndex((element: GeometryTypes) => element.id === objectId);
      if (index >= 0) {
        hall[type].splice(index, 1);
      }
    });
  }

  /**
   * Показ схемы зала
   * @param  hall Выбранный зал
   */
  public show(hall: Hall): void {
    this.hallId = hall.id;
    this.stands = hall.stands;
    this.zones = hall.zones;
    this.labels = hall.labels;
    this.engineLayers = hall.engineLayers;
    setTimeout(() => {
      this.workAreaService.scaleToScheme();
    }, 1);
  }
}
