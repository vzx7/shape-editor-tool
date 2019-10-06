import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ToolNames } from 'modules/shared/enums/tool-names.enum';
import { StorageService } from 'modules/shared/services/storage/storage.service';
import { SearchService } from 'modules/search/services/search/search.service';

/**
 * Компонент поиска на схеме.
 */
@Component({
  selector: 'app-search-panel',
  templateUrl: './search-panel.component.html',
  styleUrls: ['./search-panel.component.scss']
})
export class SearchPanelComponent implements OnInit {
  /**
   * Шаблон поиска.
   */
  @ViewChild('search') public search: ElementRef;

  public isActive: boolean;
  public toolName: ToolNames;
  constructor(
    public searchService: SearchService
  ) { }
  public ngOnInit(): void { }
  public callHandler(): void {
    if (this.isActive) {
      this.deactivateTool();
    } else {
      this.activateTool();
    }
   }
  public activateTool(): void { this.isActive = true; }
  public deactivateTool(): void { this.isActive = false; }

  /**
   * Поиск стендов
   * @param searchString поисковая строка
   */
  public searchStands(searchString: string): void {
    this.searchService.filterStands(searchString);
  }

  /**
   * Очистка поиска
   */
  public clear(): void {
    this.searchService.clearSearch();
    this.search.nativeElement.parentElement.firstChild.value = '';
  }
}
