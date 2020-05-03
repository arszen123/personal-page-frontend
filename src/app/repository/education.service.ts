import {Injectable} from '@angular/core';
import {BaseRepository} from "@app/repository/BaseRepository";
import {HttpClient} from "@angular/common/http";
import {PageService} from "@app/repository/page.service";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class EducationService extends BaseRepository {
  protected url = 'user/education';

  constructor(
    protected http: HttpClient,
    protected pageRepository: PageService
  ) {
    super();
  }

  delete(id: string): Observable<{ success: boolean }> {
    return super.delete(id).pipe(map(value => {
      this.pageRepository.deleteWidget(id, 'education');
      return value;
    }))
  }
}
