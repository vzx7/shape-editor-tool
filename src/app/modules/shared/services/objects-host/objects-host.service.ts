import { StorageService } from 'modules/shared/services/storage/storage.service';
import { Injectable } from '@angular/core';
import { Stand } from 'modules/shared/interfaces/schema/stand';
import { Zone } from 'modules/shared/interfaces/schema/zone';
import * as d3 from 'd3';
import { Label } from 'modules/shared/interfaces/schema/label';
import { ObjectType } from 'modules/shared/enums/object-type.enum';

@Injectable()
export class ObjectsHostService {

  constructor(private readonly storageService: StorageService) { }

  /**
   * Получение ноды, содержащей информацию о бизнес-объекте.
   * @param el Выбранный элемент.
   * @return родительскую ноду для выбранного элемента.
   */
  public getObjectNode(el: SVGGraphicsElement): Node & ParentNode {
    let currentNode = el.parentNode;
    while (!this.nodeIsObject(currentNode)) {
      currentNode = currentNode.parentNode;
    }

    return currentNode;
  }

  /**
   * Получение бизнес-объекта.
   * @param node Родительская нода, содержащая данные о бизнес-объекте.
   * @return Бизнес-объект.
   */
  public getObject(node: Node & ParentNode): Stand | Zone | Label {
    if (!this.nodeIsObject(node)) {
      return null;
    }

    const sel = d3.select(node);
    const id = sel.attr('data-id');
    const type = sel.attr('data-type') as ObjectType;

    return this.storageService.getObject(type, id);
  }

  /**
   * Порверка, является ли нода контейнером для бизнес-объекта.
   * @param node Нода.
   * @return Истину, если нода является контейнером для бизнес-объекта.
   */
  private nodeIsObject(node: Node & ParentNode): boolean {

    const sel = d3.select(node);
    const id = sel.attr('data-id');
    const type = sel.attr('data-type');
    if (id && type) {
      return true;
    }

    return false;
  }
}
