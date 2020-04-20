import {Injectable, Injector} from '@angular/core';
import {Repository} from "@app/interface/Repository";
import {WorkExperienceService} from "@app/repository/work-experience.service";
import {EducationService} from "@app/repository/education.service";
import {LanguageService} from "@app/repository/language.service";
import {ContactService} from "@app/repository/contact.service";
import {SkillService} from "@app/repository/skill.service";

@Injectable({
  providedIn: 'root'
})
export class RepositoryFactoryService {
  private serviceMap = {
    experience: WorkExperienceService,
    education: EducationService,
    language: LanguageService,
    contact: ContactService,
    skill: SkillService,
  };

  constructor(
    private injector: Injector
  ) { }

  public getRepository(type): Repository {
    if (typeof this.serviceMap[type] == 'undefined') {
      throw new Error('Repository not found!');
    }
    return this.injector.get(this.serviceMap[type]);
  }
}
