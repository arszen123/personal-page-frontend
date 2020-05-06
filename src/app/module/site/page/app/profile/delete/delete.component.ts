import { Component, OnInit } from '@angular/core';
import {AuthService} from "@app/service/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material";

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent implements OnInit {
  private code: string = null;
  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.code = params.code;
    })
  }
  public delete() {
    this.authService.deleteUser(this.code).subscribe((value: any) => {
      if (value.success) {
        this.router.navigate(['/app']);
      }
    }, err => {
      this.snackBar.open(err.error.message, 'OK', {duration: 2000});
    })
  }
  public stay() {
    this.router.navigate(['/app/profile/settings']);
  }
}
