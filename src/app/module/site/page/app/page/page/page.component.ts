import {Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {MatDialog, MatSnackBar} from "@angular/material";
import {AddWidgetComponent} from "@app/module/site/component/add-widget/add-widget.component";
import {PageService} from "@app/repository/page.service";
import {AuthService} from "@app/service/auth.service";
import {SecurityComponent} from "@app/module/site/page/app/page/security/security.component";
import {PersonalDataService} from "@app/repository/personal-data.service";

declare var GridStack: any;

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {
  private grid: any;
  private widgets: Array<any> = [];
  @ViewChildren('gridstackItem')
  private widgetQuery: QueryList<any>;
  private security = {};
  private personalData;

  constructor(
    private repository: PageService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private personalDataRepository: PersonalDataService
  ) {
  }

  ngOnInit() {
    // this.grid = GridStack.init();
    this.repository
      .getAll()
      .subscribe((res: any) => {
        this.widgets = res.page;
        this.security = res.security || this.security;
      });
    this.personalData = this.personalDataRepository.getAll();
  }

  private addWidget() {
    this.dialog.open(AddWidgetComponent, {
      width: '40%'
    })
      .afterClosed().subscribe(value => {
      if (value) {
        this._adWidget(value);
      }
    });
  }

  private _adWidget(item) {
    this.widgets.push(item);
  }

  private save() {
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
            this.snackBar.open('Success!', 'OK', {duration: 2000});
          }
        },
        err => this.snackBar.open(err.error.message, 'OK', {duration: 2000}));
  }

  private delete(id) {
    let tmpWidgets = [];
    for (let i in this.widgets) {
      if (i != id) {
        tmpWidgets.push(this.widgets[i]);
      }
    }
    this.widgets = tmpWidgets;
  }

  private settings() {
    let dialog = this.dialog.open(SecurityComponent, {
      data: this.security,
      width: '40%',
    });
    dialog.afterClosed().subscribe((val:any) => {
      if (typeof val === 'object' && val) {
        this.security = val;
      }
    })
  }
}
