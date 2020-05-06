import {Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {MatDialog, MatSnackBar} from "@angular/material";
import {AddWidgetComponent} from "@app/module/site/component/add-widget/add-widget.component";
import {PageService} from "@app/repository/page.service";
import {AuthService} from "@app/service/auth.service";
import {SecurityComponent} from "@app/module/site/page/app/page/security/security.component";
import {PersonalDataService} from "@app/repository/personal-data.service";
import {OnBeforeDeactivate} from "@app/interface/OnBeforeDeactivate";

declare var GridStack: any;

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit, OnBeforeDeactivate {
  public widgets: Array<any> = [];
  @ViewChildren('gridstackItem')
  private widgetQuery: QueryList<any>;
  private security = {};
  public personalData;
  private isSecurityChanged: boolean = false;
  private isWidgetsChanged: boolean = false;

  constructor(
    private repository: PageService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private personalDataRepository: PersonalDataService
  ) {
  }

  ngOnInit() {
    this.repository
      .getAll()
      .subscribe((res: any) => {
        this.widgets = res.page;
        this.security = res.security || this.security;
      });
    this.personalData = this.personalDataRepository.getAll();
  }

  public addWidget() {
    this.dialog.open(AddWidgetComponent, {
      width: '40%'
    })
      .afterClosed().subscribe(value => {
      if (value) {
        this._adWidget(value);
        this.isWidgetsChanged = true;
      }
    });
  }

  private _adWidget(item) {
    this.widgets.push(item);
  }

  public save() {
    let data: Array<object> = [];
    this.widgetQuery.forEach((item, index) => {
      let dataset = item.elem.nativeElement.dataset;
      data.push({
        type: this.widgets[index].type,
        element: this.widgets[index].element,
        gs: {
          min_width: dataset.gsMinWidth,
          max_width: dataset.gsMaxWidth,
          min_height: dataset.gsMinHeight,
          max_height: dataset.gsMaxHeight,
          width: dataset.gsWidth,
          height: dataset.gsHeight,
          x: dataset.gsX,
          y: dataset.gsY,
        }
      });
    });
    this.repository
      .save({page: data, security: this.security})
      .subscribe(success => {
          if (success) {
            this.markAsUntouched();
            this.snackBar.open('Success!', 'OK', {duration: 2000});
          }
        },
        err => this.snackBar.open(err.error.message, 'OK', {duration: 2000}));
  }

  public delete(id) {
    let tmpWidgets = [];
    for (let i in this.widgets) {
      if (i != id) {
        tmpWidgets.push(this.widgets[i]);
        continue;
      }
      this.isWidgetsChanged = true;
    }
    this.widgets = tmpWidgets;
  }

  public settings() {
    let dialog = this.dialog.open(SecurityComponent, {
      data: this.security,
      width: '40%',
    });
    dialog.afterClosed().subscribe((val:any) => {
      if (typeof val === 'object' && val) {
        this.isSecurityChanged = JSON.stringify(this.security) !== JSON.stringify(val);
        this.security = val;
      }
    })
  }

  public onBeforeDeactivate(): boolean {
    let isValueChanged = this.isSecurityChanged || this.isWidgetsChanged;
    if (isValueChanged) {
      isValueChanged = !confirm('You have unsaved modifications!\nYou really want to unload the page?');
    }
    return !isValueChanged;
  }

  private markAsUntouched() {
    this.isSecurityChanged = false;
    this.isWidgetsChanged = false;
  }
}
