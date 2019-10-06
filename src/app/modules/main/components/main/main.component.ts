import {
  TransformationHelperService
} from 'modules/shared/services/transformation-helper/transformation-helper.service';
import { GeometryBase } from 'modules/shared/interfaces/geometry/geometry-base';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { D3Base } from 'modules/shared/classes/d3Base';
import { StorageService } from 'modules/shared/services/storage/storage.service';
import { GridService } from 'modules/grid/services/grid.service';
import { UtilitesService } from 'modules/shared/services/utilites/utilites.service';
import { WorkAreaService } from 'modules/shared/services/work-area/work-area.service';
import { GridSpacing } from 'modules/grid/enums/grid-spacing.enum';
import { Hall } from 'modules/shared/interfaces/schema/hall';
import { HallSchema } from 'modules/shared/interfaces/schema/hall-schema';
import { MainService } from 'modules/main/services/main.service';
import { FileService } from 'modules/shared/modules/file/services/file.service';

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
   * Показываем ли схему.
   */
  public isShowSchema: boolean;

  /**
   * Контейнер Рабочей области.
   */
  @ViewChild('mainContainer') private readonly mainContainer: ElementRef;

  constructor(
    public readonly storageService: StorageService,
    public readonly gridService: GridService,
    public readonly workAreaService: WorkAreaService,
    public readonly utilitesService: UtilitesService,
    private readonly fileService: FileService,
    private readonly transformationService: TransformationHelperService,
    private readonly mainService: MainService
  ) {
    super();
    this.gridService.isActivated.subscribe((value: boolean) => {
      this.isGrid = value;
    });
    this.gridService.stepChoosed.subscribe((step: GridSpacing) => {
      this.gridService.showGrid(step);
    });
    this.storageService.pavilionChosen.subscribe((hall: Hall) => {
      this.showHall(hall);
    });
    this.fileService.schemaUploaded.subscribe((schema: HallSchema) => {
      this.storageService.schema = schema;
      this.isShowSchema = true;
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
   * Показ схемы зала
   * @param  hall Выбранный зал
   */
  private showHall(hall: Hall): void {
    this.storageService.hallId = hall.id;
    this.mainService.getHall(hall.id).subscribe((schema: HallSchema) => {
      this.storageService.schema = schema;
      setTimeout(() => {
      this.isShowSchema = true;
      this.storageService.schemaLoaded.emit();
      });
    });
  }
}
