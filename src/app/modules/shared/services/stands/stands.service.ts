import { EventEmitter, Injectable } from '@angular/core';
import { D3Base } from 'modules/shared/classes/d3Base';
import { Polygon } from 'modules/shared/interfaces/geometry/polygon';
import { ObjectsHostService } from 'modules/shared/services/objects-host/objects-host.service';
import { EditorStateService } from '../editor-state/editor-state.service';
import { ObjectType } from 'modules/shared/enums/object-type.enum';
import { ToolNames } from 'modules/shared/enums/tool-names.enum';
import { EditorMode } from 'modules/shared/enums/editor-mode.enum';
import { Stand } from 'modules/shared/interfaces/schema/stand';
import { StorageService } from '../storage/storage.service';

/**
 * Сервис для работы со стендами.
 */
@Injectable()
export class StandsService extends D3Base {

  constructor(
    private readonly objectsHost: ObjectsHostService,
    private readonly editorStateService: EditorStateService,
    private readonly storageService: StorageService
  ) {
    super();
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

    let square = Math.abs(this.d3.polygonArea(<[number, number][]>geometry.bound.map((v) => [v.x, v.y])));

    if (geometry.holes) {
      geometry.holes.forEach((hole) => {
        square -= Math.abs(this.d3.polygonArea(<[number, number][]>hole.map((v) => [v.x, v.y])));
      });
    }

    return square ? square : 0;
  }

  /**
   * Редактировать стенд.
   * @param id ID стенда.
   */
  public editStand(id: string): void {
    this.editorStateService.modeHandler.emit({
      isEditMode: true,
      objectType: ObjectType.Stand,
      toolName: ToolNames.PolygonTool,
      editorMode: EditorMode.Update,
      objectId: id
    });
  }

  /**
   * Сохранить изминение площади стенда.
   * @param choosenStand стенд.
   * @param uuid uuid объекта..
   * @return Stand
   */
  public updateStand(choosenStand: Stand, uuid: string): Stand {
    if (!choosenStand || !uuid) { return; }
    choosenStand = this.storageService.getObject(ObjectType.Stand, choosenStand.id);
    choosenStand.square = Number(this.getSquareStand(uuid).toFixed());

    return choosenStand;
  }

  /**
   * Вызываем событие деактивации редактора.
   */
  public doEditorDeactivateEmit(): void {
    this.editorStateService.modeHandler.emit({
      isEditMode: false
    });
  }
}
