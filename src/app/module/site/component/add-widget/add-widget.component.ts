import {AfterViewInit, Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material";
import {form as formData} from '@assets/form';
import {FormBuilderComponent} from "@app/module/site/component/form-builder/form-builder.component";
import {Repository} from "@app/interface/Repository";
import {RepositoryFactoryService} from "@app/factory/repository-factory.service";
import Utils from "@app/utils/utils";
import {LanguageService} from "@app/service/language.service";

@Component({
  selector: 'app-add-widget',
  templateUrl: './add-widget.component.html',
  styleUrls: ['./add-widget.component.scss']
})
export class AddWidgetComponent implements OnInit, AfterViewInit {
  private formData = formData.widget;
  @ViewChild('form', {static: true})
  private form: FormBuilderComponent;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private repoFactory: RepositoryFactoryService,
    private langService: LanguageService
  ) {
  }

  /**
   * @todo outsource
   */
  private elementToString(value, type) {
    switch (type) {
      case 'experience':
        return `${value.company_name}`;
      case 'education':
        return `${value.institute}`;
      case 'language':
        const lang = this.langService.getLanguageInfo(value.lang_id);
        let res = value.lang_id;
        if (lang) {
          res = lang.name;
        }
        return `${res} - ${value.lang_level_id}`;
      case 'contact':
        return `${value.value}`;
      default:
        throw new Error();
    }
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.form.subscribeValueChanges('type', type => {
      let repo: Repository;
      try {
        repo = this.repoFactory.getRepository(type);
      } catch (e) {
        return;
      }
      if (type === 'skill') {
        Utils.hideFormElement(this.formData.elements.element);
        return;
      }
      Utils.showFormElement(this.formData.elements.element);
      repo.getAll().subscribe(val => {
        let options = {};
        for (let valKey in val) {
          if (!val.hasOwnProperty(valKey)) {
            continue;
          }
          options[val[valKey].id] = this.elementToString(val[valKey], type);
          this.formData.elements.element.options = options;
        }
      });
    })
  }

  private getValue() {
    return this.form.getValue();
  }

  private isFormValid() {
    this.form.submit();
    return this.form.isValid();
  }
}
