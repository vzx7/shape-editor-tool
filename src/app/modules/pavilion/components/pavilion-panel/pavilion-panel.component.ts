import { Component, OnInit } from '@angular/core';
import { StorageService } from 'modules/shared/services/storage/storage.service';
/**
 * @todo Описать компонент
 */
@Component({
  selector: 'app-pavilion-panel',
  templateUrl: './pavilion-panel.component.html',
  styleUrls: ['./pavilion-panel.component.scss']
})
export class PavilionPanelComponent implements OnInit {
  constructor(
    public readonly storageService: StorageService
  ) { }

  public ngOnInit(): void {  }
}
