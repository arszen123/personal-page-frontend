import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {OnBeforeDeactivate} from "@app/interface/OnBeforeDeactivate";

@Injectable({
  providedIn: 'root'
})
export class FormNotSavedGuard implements CanDeactivate<OnBeforeDeactivate> {
  canDeactivate(component: OnBeforeDeactivate, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return component.onBeforeDeactivate();
  }
}
