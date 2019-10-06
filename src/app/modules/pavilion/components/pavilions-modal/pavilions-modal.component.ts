import { Component, Input } from '@angular/core';
import { BaseModalComponent } from 'modules/shared/components/base-modal/base-modal.component';
import { PavilionService } from 'modules/pavilion/services/pavilion.service';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { StorageService } from 'modules/shared/services/storage/storage.service';
import { ModalName } from 'modules/shared/enums/modal-name.enum';
import { Hall } from 'modules/shared/interfaces/schema/hall';

@Component({
  selector: 'app-pavilions-modal',
  templateUrl: './pavilions-modal.component.html',
  styleUrls: ['./pavilions-modal.component.scss']
})
export class PavilionsModalComponent extends BaseModalComponent {
  /**
   * Холы.
   */
  public halls: Hall[];
  /**
   * Лэйбл на кнопке выбора павилиона.
   */
  @Input() public label: { name: string };
  constructor(
    public ngxSmartModalService: NgxSmartModalService,
    private readonly pavilionService: PavilionService,
    private readonly storageService: StorageService
  ) {
    super(ngxSmartModalService);
    this.pavilionService.selectOpened.subscribe((isActive: boolean) => {
      this.open(isActive);
    });

    this.halls = this.storageService.schema.halls;
  }

  /**
   * Открытие и закрытие модала
   * @param isActive Открыт ли он
   */
  public open(isActive: boolean): void {
    if (isActive === true) {
      this.openModal(ModalName.Pavilions);
    } else {
      this.closeModal(ModalName.Pavilions);
    }
  }

  /**
   * Обработка события на закрытие модала.
   */
  public onClose(): void {
    this.actionEmit(ModalName.Pavilions, false);
  }

  public onSelectHall(hall: Hall): void {
    this.label.name = `${hall.pavilion}`;
    this.pavilionService.selectHall(hall);
  }
}
