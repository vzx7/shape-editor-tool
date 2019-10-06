import { EventEmitter, Injectable } from '@angular/core';
import { ToolNames } from 'modules/shared/enums/tool-names.enum';
import ToolState from 'modules/shared/interfaces/tools/tool-state';
import { GroupTools } from 'modules/shared/interfaces/tools/group-tools';
import { GroupToolNames } from 'modules/shared/enums/group-tool-names.enum';

/**
 * Сервис деактивации инструметнов.
 */
@Injectable()
export class ToolActivateService {
  /**
   * Эмитор состояния инструмента (активен/неактивен).
   */
  public activeMode: EventEmitter<ToolState>;
  /**
   * Эмитор деактивации редактора.
   */
  public onDeactivate: EventEmitter<ToolNames[]>;
  /**
   * Группы инструментов для деактивации при переключение инструментов.
   */
  private readonly groupsToolNames: GroupTools[];

  constructor() {
    this.groupsToolNames = [
      {
        groupName: GroupToolNames.EditorGroup,
        toolNames: [
          ToolNames.PolygonTool,
          ToolNames.RotatorTool,
          ToolNames.MovementTool,
          ToolNames.TextTool
        ]
      },
      {
        groupName: GroupToolNames.MultiSelectGroup,
        toolNames: [
          ToolNames.MultiSelectTool
        ]
      },
      {
        groupName: GroupToolNames.ZoomGroup,
        toolNames: [
          ToolNames.ZoomingTool
        ]
      },
      {
        groupName: GroupToolNames.LayersGroup,
        toolNames: [
          ToolNames.LayersTool
        ]
      },
      {
        groupName: GroupToolNames.StandsGroup,
        toolNames: [
          ToolNames.StandsTool
        ]
      },
    ];

    this.activeMode = new EventEmitter<ToolState>();
    this.onDeactivate = new EventEmitter<ToolNames[]>();
    this.activeMode.subscribe((state: ToolState) => {
      if (state.isActive) {
        this.doDeactivate(state);
      }
    });
  }

  /**
   * При активации какого либо инструмента, деактивирует остальные.
   * @param state Объект состояния выбираемого инструмента.
   */
  private doDeactivate(state: ToolState): void {
    switch (state.toolName) {
      case ToolNames.MultiSelectTool:
        this.doDeactivateEmit(GroupToolNames.EditorGroup);
        this.doDeactivateEmit(GroupToolNames.ZoomGroup);
        break;

      case ToolNames.ZoomingTool:
        this.doDeactivateEmit(GroupToolNames.MultiSelectGroup);
        this.doDeactivateEmit(GroupToolNames.EditorGroup);
        break;

      case ToolNames.PolygonTool:
        this.doDeactivateEmit(GroupToolNames.MultiSelectGroup);
        this.doDeactivateEmit(GroupToolNames.EditorGroup, [ToolNames.PolygonTool]);
        break;

      case ToolNames.RotatorTool:
        this.doDeactivateEmit(GroupToolNames.MultiSelectGroup);
        this.doDeactivateEmit(GroupToolNames.EditorGroup, [ToolNames.RotatorTool]);
        break;

      case ToolNames.TextTool:
        this.doDeactivateEmit(GroupToolNames.MultiSelectGroup);
        this.doDeactivateEmit(GroupToolNames.EditorGroup, [ToolNames.TextTool]);
        break;

      case ToolNames.MovementTool:
        this.doDeactivateEmit(GroupToolNames.MultiSelectGroup);
        this.doDeactivateEmit(GroupToolNames.EditorGroup, [ToolNames.MovementTool]);
        break;

      case ToolNames.LayersTool:
        this.doDeactivateEmit(GroupToolNames.StandsGroup);
        this.doDeactivateEmit(GroupToolNames.EditorGroup);
        this.doDeactivateEmit(GroupToolNames.MultiSelectGroup);
        break;
    }
  }

  /**
   * Вызываем события деактивации группы.
   * @param groupToolNames Имы дективируемой группы.
   * @param exclude Инструменты которые нужно оставить активными.
   */
  private doDeactivateEmit(groupToolNames: GroupToolNames, exclude?: ToolNames[]): void {
    let group = this.groupsToolNames
      .find((item) => item.groupName === groupToolNames).toolNames;

    if (exclude) {
      group = group.filter((name) => !exclude.includes(name));
    }

    if (group && group.length > 0) {
      this.onDeactivate.emit(group);
    }
  }
}
