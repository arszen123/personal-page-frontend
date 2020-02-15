import {Directive, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';
import {AuthService} from "@app-service/auth.service";

@Directive({
  selector: '[ppShowIfLoggedIn]'
})
export class ShowIfLoggedInDirective implements OnDestroy, OnInit {
  @Input() ppShowIfLoggedIn: boolean = true;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private authService: AuthService
  ) {
  }

  ngOnDestroy(): void {
    this.authService.isLoggedInO().unsubscribe();
  }

  ngOnInit(): void {
    this.authService.isLoggedInO().subscribe((isLoggedIn) => {
      if (isLoggedIn) {
        if (this.ppShowIfLoggedIn) {
          this.viewContainer.createEmbeddedView(this.templateRef);
        } else {
          this.viewContainer.clear();
        }
      } else {
        if (this.ppShowIfLoggedIn) {
          this.viewContainer.clear();
        } else {
          this.viewContainer.createEmbeddedView(this.templateRef);
        }
      }
    });
  }
}
