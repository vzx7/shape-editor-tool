import { Injectable } from '@angular/core';
import { D3Base } from 'modules/shared/classes/d3Base';
import { StorageService } from 'modules/shared/services/storage/storage.service';
import * as genUuid from 'shortid';
import { Label } from 'modules/shared/interfaces/schema/label';
import {
  TransformationHelperService
} from '../../../shared/services/transformation-helper/transformation-helper.service';
import { ObjectType } from 'modules/shared/enums/object-type.enum';

@Injectable()
export class TextService extends D3Base {
  /**
   * Тип объектов текстового слоя.
   */
  private readonly textType: ObjectType = ObjectType.Text;
  /**
   * Размер шрифта по умолчанию.
   */
  private readonly defaultFontSize: number = 15;
  /**
   * Ширина контейнера по умолчанию.
   */
  private readonly defaultContainerWidth: number = 100;
  /**
   * Высота контейнера по умолчанию.
   */
  private readonly defaultContainerHeight: number = 25;
  /**
   * Идентификатор группы элементов управления текстом.
   */
  private readonly textControlsId: string = 'text-controls';
  /**
   * Селектор для svg-текстовых объектов(svg:text).
   */
  private readonly textObject: string = 'text-object';
  /**
   * Редактируется ли текст.
   */
  private isTextEditing: boolean;
  /**
   * Редактируемый элемент.
   */
  private editingElement: Label;

  /**
   * Отступы для элементов управления.
   */
  private readonly resizeControlPadding: number = 15;

  /**
   * Шрифт по умолчанию.
   */
  private readonly fontFamily: string = 'serif';

  constructor(
    private readonly storageSevice: StorageService,
    private readonly transformationService: TransformationHelperService
  ) {
    super();
    genUuid.characters('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZабвгдеёжзийк');
  }

  /**
   * Активация инструмента работы с текстом.
   */
  public enableText(): void {
    super.getSvg();
    this.svg.selectAll(`.${this.textObject}`).on('click', this.onSchemaTextClick.bind(this));

    this.svg.on('click', () => {
      if (this.isTextEditing || this.d3.event.target.nodeName !== 'svg') {
        this.isTextEditing = false;
        this.editSvgText();

        return;
      }
      const newGroup = this.createTextGroup();

      const fObject = this.createForeingObject(newGroup, this.d3.event.layerX, this.d3.event.layerY);
      this.createInput(fObject);
      newGroup.on('click', this.onTextGroupClick.bind(this));
      const bbox = fObject.node().getBBox();

      this.removeTextControl();
      this.addTextControls(bbox);
    });
  }

  /**
   * Деактивация инструмента работы с текстом.
   */
  public disableText(): void {
    super.killEventHandlers(['click']);
    this.svg.selectAll(`.${this.textObject}`).on('click', null);
    this.removeTextControl();
  }

  /**
   * Функция для редактирования svg-текста, отрендеренного со схемы.
   */
  private editSvgText(): void {
    const editableTextGroup = this.svg.selectAll('.editable-text-group');
    const textObjects = [];

    editableTextGroup.each((datum, index: number, group: d3.BaseType[]) => {
      const editableContainer = this.d3.select(group[index]);
      const foreignObj = editableContainer.select('foreignObject');
      const uuid = foreignObj.attr('id');
      const x = parseInt(foreignObj.attr('x'), 10);
      const y = parseInt(foreignObj.attr('y'), 10) + this.resizeControlPadding;
      const width = parseInt(foreignObj.attr('width'), 10);
      const height = parseInt(foreignObj.attr('height'), 10);
      const fInput = foreignObj.select('input');
      const text = fInput.property('value');
      const fontSize = parseInt(fInput.attr('font-size'), 10);
      const fontFamily = fInput.attr('font-family');
      const label = <Label>{
        id: uuid,
        geometry: {
          x,
          y,
          width,
          height,
          text,
          fontSize,
          fontFamily
        }
      };
      if (this.editingElement) {
        label.geometry.transformation = this.editingElement.geometry.transformation;
        this.editingElement = null;
      }
      textObjects.push(label);
      editableContainer.remove();
    });
    textObjects.forEach((textObject: Label) => this.storageSevice.addObject(this.textType, textObject));
    this.removeTextControl();
    this.svg.selectAll(`.${this.textObject}`).on('click', this.onSchemaTextClick.bind(this));
  }

  /**
   * Каллбек клика на объект svg:text.
   * @param datum Датум.
   * @param index Индекс.
   * @param group Группа.
   */
  private onSchemaTextClick(datum: any, index: number, group: d3.BaseType[]): void {
    this.d3.event.stopPropagation();
    const svgTextGroup = this.d3.select(group[index]);
    const element = svgTextGroup.select('text');
    const uuid = svgTextGroup.attr('data-id');
    let x = parseInt(element.attr('x'), 10);
    let y = parseInt(element.attr('y'), 10) - this.resizeControlPadding;
    const width = parseInt(element.attr('width'), 10);
    const height = parseInt(element.attr('height'), 10);
    const text = element.text();
    const fontSize = parseInt(element.attr('font-size'), 10);
    this.editingElement = this.storageSevice.getObject(this.textType, uuid);
    if (this.editingElement.geometry.transformation && this.editingElement.geometry.transformation.translation) {
      x = x + this.editingElement.geometry.transformation.translation.x;
      y = y + this.editingElement.geometry.transformation.translation.y;
    }
    this.storageSevice.removeObject(this.textType, uuid);

    const textGroup = this.createTextGroup();
    const fObject = this.createForeingObject(textGroup, x, y, width, height, uuid);
    this.createInput(fObject, text, fontSize);
    this.addTextControls(fObject.node().getBBox());
  }

  /**
   * Создание группы для рендера в нее элементов для работы с текстом.
   * @return Созданную группу.
   */
  private createTextGroup(): d3.Selection<SVGGElement, {}, HTMLElement, any> {
    return this.svg.select('#schema-layer')
      .append('g')
      .classed('editable-text-group', true);
  }

  /**
   * Каллбек клика на группу работы с текстом.
   * @param datum Датум.
   * @param index Индекс.
   * @param group Группа.
   */
  private onTextGroupClick(datum: any, index: number, group: SVGGElement[]): void {
    this.isTextEditing = true;
    this.d3.event.stopPropagation();
    const bbox = this.d3.select(group[index]).node().getBBox();
    this.removeTextControl();
    this.addTextControls(bbox);
  }

  /**
   * Создание ForeignObject с инпутом для работы с текстом.
   * @param group Группа.
   * @param x Координата X.
   * @param y Координата Y.
   * @param width Ширина.
   * @param height Высота.
   * @param id Идентификатор.
   * @return ForeignObject с инпутом.
   */
  private createForeingObject(
    group: d3.Selection<SVGGElement, {}, HTMLElement, any>,
    x: number,
    y: number,
    width: number = this.defaultContainerWidth,
    height: number = this.defaultContainerHeight,
    id: string = genUuid.generate()
  ): d3.Selection<SVGForeignObjectElement, {}, HTMLElement, any> {
    const fObject = group
      .append('foreignObject');

    fObject.attr('id', id)
      .attr('x', `${x}px`)
      .attr('y', `${y}px`)
      .attr('width', `${width}px`)
      .attr('height', `${height}px`);

    return fObject;
  }

  /**
   * Создание инпута в ForeignObject.
   * @param fObject ForeignObject, в который встраивается input.
   * @param text Текст инпута.
   * @param fontSize Размер шрифта инпута.
   * @return инпут.
   */
  private createInput(
    fObject: d3.Selection<SVGForeignObjectElement, {}, HTMLElement, any>,
    text: string = 'Введите текст',
    fontSize: number = this.defaultFontSize
  ): d3.Selection<d3.BaseType, {}, HTMLElement, any> {
    const div = fObject.append('xhtml:div');
    const input = div.append('xhtml:input')
      .attr('type', 'text')
      .attr('font-size', `${fontSize}px`)
      .attr('font-family', this.fontFamily)
      .property('value', text)
      .style('width', `${this.defaultContainerWidth}px`);
    const span = div.append('xhtml:span')
      .style('visibility', 'hidden')
      .style('white-space', 'pre')
      .attr('font-size', `${fontSize}px`)
      .attr('font-family', this.fontFamily);

    this.resizeInputForText(input.property('value'), span, input, fObject);

    input.on('keypress', () => {
      if (this.d3.event.keyCode) {
        const char = String.fromCharCode(this.d3.event.keyCode);
        this.resizeInputForText(input.property('value') + char, span, input, fObject);
      }
    }).on('keyup', () => {
      const backspaceCode = 8;
      const delCode = 46;
      if (this.d3.event.keyCode === backspaceCode || this.d3.event.keyCode === delCode) {
        this.resizeInputForText(input.property('value'), span, input, fObject);
      }
    }).on('focus', () => {
      this.isTextEditing = true;
    }).on('click', () => {
      this.d3.event.stopPropagation();
    });

    const node = input.node() as HTMLElement;
    node.focus();

    return input;
  }

  /**
   * Ресайз инпута.
   * @param text Текст.
   * @param span Спан.
   * @param input Инпут.
   * @param fObject ForeignObject (контейнер всего вышеперечисленного).
   */
  private resizeInputForText(
    text: string,
    span: d3.Selection<d3.BaseType, {}, HTMLElement, any>,
    input: d3.Selection<d3.BaseType, {}, HTMLElement, any>,
    fObject: d3.Selection<SVGForeignObjectElement, {}, HTMLElement, any>): void {
    const distance = 5;
    span.text(text);
    const spanNode = span.node() as HTMLElement;
    const spanWidth = spanNode.getBoundingClientRect().width;
    if (spanWidth < this.defaultContainerWidth) {
      return;
    }

    input.style('width', `${spanWidth}px`);
    fObject.attr('width', `${spanWidth + distance}px`);
    const bbox = fObject.node().getBBox();
    this.removeTextControl();
    this.addTextControls(bbox);
  }

  /**
   * Добавление элементов управления текстом.
   * @param bbox BBox.
   */
  private addTextControls(bbox: DOMRect): void {
    const resizeControlClass = 'resize-control';
    const borderPadding = 10;
    const elementControlSize = 10;
    const controlWidth = bbox.width + borderPadding + borderPadding;
    const controlHeight = bbox.height + borderPadding + borderPadding;

    const controlGroup = this.svg.append('g')
      .attr('id', this.textControlsId);

    controlGroup.append('rect')
      .classed(resizeControlClass, true)
      .attr('x', bbox.x - borderPadding)
      .attr('y', bbox.y - borderPadding)
      .attr('width', controlWidth)
      .attr('height', controlHeight)
      .attr('fill', 'none')
      .attr('stroke', 'black')
      .attr('pointer-events', 'none');

    controlGroup.append('rect')
      .classed(resizeControlClass, true)
      .attr('x', bbox.x - this.resizeControlPadding)
      .attr('y', bbox.y - this.resizeControlPadding)
      .attr('width', elementControlSize)
      .attr('height', elementControlSize);

    controlGroup.append('rect')
      .classed(resizeControlClass, true)
      .attr('x', bbox.x - this.resizeControlPadding + controlWidth)
      .attr('y', bbox.y - this.resizeControlPadding)
      .attr('width', elementControlSize)
      .attr('height', elementControlSize);

    controlGroup.append('rect')
      .classed(resizeControlClass, true)
      .attr('x', bbox.x - this.resizeControlPadding)
      .attr('y', bbox.y - this.resizeControlPadding + controlHeight)
      .attr('width', elementControlSize)
      .attr('height', elementControlSize);

    controlGroup.append('rect')
      .classed(resizeControlClass, true)
      .attr('x', bbox.x - this.resizeControlPadding + controlWidth)
      .attr('y', bbox.y - this.resizeControlPadding + controlHeight)
      .attr('width', elementControlSize)
      .attr('height', elementControlSize);

    controlGroup.selectAll('.resize-control').on('click', () => {
      this.d3.event.stopPropagation();
      alert();
    });
  }

  /**
   * Удаление элементов управления текстом.
   */
  private removeTextControl(): void {
    this.svg.selectAll(`#${this.textControlsId}`).remove();
  }
}
