import {Component, OnInit} from '@angular/core';
import {PublicProfileService} from "@app/service/public-profile.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Observable, of} from "rxjs";
import LocalStore from "@app/utils/store";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public profileData: any;
  public isSuccess$: Observable<boolean> = of(false);
  public needAuth$: Observable<boolean> = of(false);
  public pageId: string = '';
  private fileData: { filename: string | null; data: Blob };

  constructor(
    private profileService: PublicProfileService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.route.params.subscribe(value => {
      this.pageId = value.id;
      this._getPageData(this.pageId);
    });
  }

  authorize(password: string) {
    this._getPageData(this.pageId, password);
  }

  private calcWidth(width: any) {
    const docWidth = document.getElementsByTagName('body')[0].offsetWidth;
    if (docWidth >= 1900 || width >= 5) {
      return width;
    }
    const diff = 1920 - docWidth;
    console.log(document.getElementsByTagName('body')[0].offsetWidth);
    const widthDiff = diff / (72 * 4);
    console.log({width, widthDiff: width + widthDiff, diff});
    return Number.parseInt(width) + widthDiff;
  }

  private _getPageData(pageId: string, password?: string) {
    this.profileService.getPageData(pageId, password)
      .subscribe(profileData => {
          this.isSuccess$ = of(true);
          this.profileData = profileData;
        },
        error => {
          const resError = error.error;
          const errorCode = resError.code;
          if (resError.status === 404) {
            this.isSuccess$ = of(false);
            this.router.navigateByUrl('/not-found');
            return;
          }
          if (errorCode === 'not_published') {
            this.isSuccess$ = of(false);
            LocalStore.remove(`page_${pageId}`);
            this.router.navigateByUrl('/app');
            return;
          }
          if (errorCode === 'not_authorized') {
            this.isSuccess$ = of(false);
            this.needAuth$ = of(true);
            LocalStore.remove(`page_${pageId}`);
          }
        });

  }

  public downloadCv() {
    if (typeof this.fileData !== 'undefined') {
      this._downloadFile(this.fileData.filename, this.fileData.data);
      return;
    }
    this.profileService.downloadCV(this.pageId).subscribe((data) => {
      if (data.filename === null) {
        console.error('No file name');
        return;
      }
      this.fileData = data;
      this._downloadFile(data.filename, data.data);
    });
  }

  private _downloadFile(filename: string, blob: Blob) {
    const a = document.createElement('a');
    const url = window.URL.createObjectURL(blob);
    a.href = url;
    a.target = '_blank';
    a.download = filename;
    a.click();
  }
}
