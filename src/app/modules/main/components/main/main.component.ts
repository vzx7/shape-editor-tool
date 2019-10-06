import {
  TransformationHelperService
} from 'modules/shared/services/transformation-helper/transformation-helper.service';
import { GeometryBase } from 'modules/shared/interfaces/geometry/geometry-base';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { D3Base } from 'modules/shared/classes/d3Base';
import { StorageService } from 'modules/shared/services/storage/storage.service';
import schema from './schema.json';
import { GridService } from 'modules/grid/services/grid.service';
import { UtilitesService } from 'modules/shared/services/utilites/utilites.service';
import { WorkAreaService } from 'modules/shared/services/work-area/work-area.service';
import { GridSpacing } from 'modules/grid/enums/grid-spacing.enum';

/**
 * Базовый компонент рабчей области.
 */

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent extends D3Base implements OnInit {
  /**
   * Нужна ли сетка.
   */
  public isGrid: boolean;
  /**
   * Высота компонента.
   */
  public editor: any;

  /**
   * Контейнер Рабочей области.
   */
  @ViewChild('mainContainer') private readonly mainContainer: ElementRef;

  constructor(
    public readonly storageService: StorageService,
    public readonly gridService: GridService,
    public readonly workAreaService: WorkAreaService,
    public readonly utilitesService: UtilitesService,
    private readonly transformationService: TransformationHelperService
  ) {
    super();
    this.initSchema();
    this.gridService.isActivated.subscribe((value: boolean) => {
      this.isGrid = value;
    });
    this.gridService.stepChoosed.subscribe((step: GridSpacing) => {
      this.gridService.showGrid(step);
    });
  }

  public ngOnInit(): void {
    this.editor = this.mainContainer.nativeElement;
    this.workAreaService.setScreenSize(
      this.mainContainer.nativeElement.offsetWidth,
      this.mainContainer.nativeElement.offsetHeight
    );
  }

  /**
   * Формирование набора трансформаций для объекта.
   * @param geom Объект геометрии.
   * @return Строку, содержащую настройки трансформации объекта SVG.
   */
  public generateTransformation(geom: GeometryBase): string {
    return this.transformationService.generateTransformation(geom);
  }

  /**
   * Инициализация схемы.
   */
  public initSchema(): void {
    this.storageService.schema = {halls: []};
    this.storageService.schema.halls = schema.halls;
  }

}
