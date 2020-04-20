import {Injectable} from '@angular/core';
import {BaseRepository} from "@app/repository/BaseRepository";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {PageService} from "@app/repository/page.service";

@Injectable({
  providedIn: 'root'
})
export class WorkExperienceService extends BaseRepository{
  protected url = 'user/work-experience';

  constructor(
    protected http: HttpClient,
    protected pageRepository: PageService
  ) {
    super();
  }

  delete(id: string): Observable<{ success: boolean }> {
    return super.delete(id).pipe(map(value => {
      this.pageRepository.deleteWidget(id, 'experience');
      return value;
    }))
  }
}
