import { Stand } from 'modules/shared/interfaces/schema/stand';
import { Zone } from 'modules/shared/interfaces/schema/zone';
import { Injectable } from '@angular/core';
import { D3Base } from 'modules/shared/classes/d3Base';
import * as d3 from 'd3';
import { Vector } from 'modules/shared/interfaces/geometry/vector';
import {
  TransformationHelperService
} from 'modules/shared/services/transformation-helper/transformation-helper.service';
import { Label } from 'modules/shared/interfaces/schema/label';
import { ObjectsHostService } from 'modules/shared/services/objects-host/objects-host.service';
import { SvgNativeHelperService } from '../svg-native-helper/svg-native-helper.service';
import { EditorState } from 'modules/shared/interfaces/editor/editor-state';
import { EditorMode } from 'modules/shared/enums/editor-mode.enum';
import { EditorСSSClasses } from 'modules/editor/enums/editorсssclasses.enum';
import { Colors } from 'modules/shared/enums/colors.enum';

/**
 * Сервис для работы с перемещением объектов.
 */
@Injectable()
export class MovementService extends D3Base {
  /**
   * Режим редактора.
   */
  private editorMode: EditorMode;
  /**
   * Селектор для перемещаемых объектов.
   */
  private selectorClass: string;

  constructor(
    private readonly objectsHost: ObjectsHostService,
    private readonly transformationService: TransformationHelperService,
    private readonly svgTransformationHelper: SvgNativeHelperService
  ) {
    super();
  }

  /**
   * Актифация сервиса.
   * @param editorState Состояние редактора.
   */
  public enable(editorState: EditorState): void {
    this.editorMode = editorState.editorMode;

    if (editorState.objectId && this.editorMode === EditorMode.Update) {
      this.selectorClass = EditorСSSClasses.OneEditableLayer;
    } else if (this.editorMode === EditorMode.Create) {
      this.selectorClass = EditorСSSClasses.NewPolygon;
    } else {
      this.selectorClass = EditorСSSClasses.MoveableElement;
    }

    const elements = d3.selectAll(`.${this.selectorClass}`);
    let startMousePosition: Vector = null;
    let startTranslation: Vector = null;
    let target: SVGGraphicsElement = null;
    let obj: Stand | Zone | Label;
    elements
      .call(d3.drag()
        .on('start', () => {
          const me = d3.event.sourceEvent as MouseEvent;
          target = me.target as SVGGraphicsElement;
          const node = this.objectsHost.getObjectNode(target);
          obj = this.objectsHost.getObject(node);

          startTranslation = this.transformationService.getTranslation(obj.geometry);
          startMousePosition = this.svgTransformationHelper.getRealVector({ x: me.x, y: me.y }, target);
        })
        .on('drag', () => {
          const me = d3.event.sourceEvent as MouseEvent;

          const mousePos = this.svgTransformationHelper.getRealVector({ x: me.x, y: me.y }, target);

          const delta = this.transformationService.decrVector(mousePos, startMousePosition);

          const newTranslation = this.transformationService.addVector(startTranslation, delta);

          this.transformationService.setTranslation(obj.geometry, newTranslation);
        })
        .on('end', () => {
          target = null;
          obj = null;

          startMousePosition = null;
        }));

    elements
      .style('cursor', 'move')
      .select('path')
      .style('fill', Colors.RedLight)
      .classed(EditorСSSClasses.PolygonEditArea, true);
  }

  /**
   * Деактивация сервиса.
   */
  public disable(): void {
    d3.selectAll(`.${this.selectorClass}`)
      .on('.drag', null)
      .on('.dragstart', null)
      .on('.dragend', null)
      .style('cursor', null);
    d3.select(`.${EditorСSSClasses.PolygonEditArea}`)
      .style('fill', null)
      .classed(EditorСSSClasses.PolygonEditArea, false)
      .classed(EditorСSSClasses.OneEditableLayer, false);

  }
}
