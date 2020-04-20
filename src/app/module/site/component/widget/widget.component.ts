import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {RepositoryFactoryService} from "@app/factory/repository-factory.service";
import {Repository} from "@app/interface/Repository";

@Component({
  selector: 'app-widget-edit',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.scss']
})
export class WidgetComponent implements OnInit {
  @Input()
  private data: any = null;
  @Output('delete')
  private _delete: EventEmitter<void> = new EventEmitter();
  private repository: Repository = null;
  private entity: any;

  constructor(
    private repoFactory: RepositoryFactoryService
  ) {
  }

  ngOnInit() {
    try {
      this.repository = this.repoFactory.getRepository(this.data.type);
    } catch (e) {
      throw new Error('Not supported widget type!');
    }
    this.entity = this.repository.get(this.data.element);
  }

  private delete() {
    this._delete.emit();
  }

}
