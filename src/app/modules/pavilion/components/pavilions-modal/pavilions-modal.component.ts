import { Component, Input } from '@angular/core';
import { BaseModalComponent } from 'modules/shared/components/base-modal/base-modal.component';
import { PavilionService } from 'modules/pavilion/services/pavilion.service';
import { NgxSmartModalService } from 'ngx-smart-modal';
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

  /**
   * Id выбранного хола.
   */
  public selectedHallId: string;

  constructor(
    public ngxSmartModalService: NgxSmartModalService,
    private readonly pavilionService: PavilionService
  ) {
    super(ngxSmartModalService);
  }

  /**
   * Открытие модала
   */
  public open(): void {
    this.pavilionService.getHalls().subscribe((halls: Hall[]) => {
      this.halls = halls;
      this.openModal(ModalName.Pavilions);
    });
  }

  /**
   * Закрытие модала
   */
  public close(): void {
    this.closeModal(ModalName.Pavilions);
  }

  /**
   * Обработка события на закрытие модала.
   */
  public onClose(): void {
    this.actionEmit(ModalName.Pavilions, false);
  }

  /**
   * Выбор хола.
   * @param hall hall
   */
  public onSelectHall(hall: Hall): void {
    this.label.name = `${hall.pavilion}`;
    this.pavilionService.selectHall(hall);
    this.selectedHallId = hall.id;
  }
}
