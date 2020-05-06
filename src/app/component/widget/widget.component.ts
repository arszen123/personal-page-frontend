import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {LanguageService} from "@app/service/language.service";

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.scss']
})
export class WidgetComponent implements OnInit, OnChanges {
  @Input('data')
  public entity: any = null;
  @Input()
  public type: string = null;
  @Input()
  public allowDelete: boolean = false;
  @Output('delete')
  private _delete: EventEmitter<void> = new EventEmitter();

  constructor(
    private langService: LanguageService
  ) {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.entity && this.type === 'language') {
      const lang = this.langService.getLanguageInfo(this.entity.lang_id);
      if (lang) {
        this.entity.lang = lang.name;
      }
      this.entity.lang_level = this.entity.lang_level_id;
    }
  }

  public delete() {
    this._delete.emit();
  }
}
