import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RoleDTO } from 'src/app/models/role/role.model';
import { UserDTO } from 'src/app/models/user/user.model';
import { ToastService } from 'src/app/services/toast/toast.service';
import { UserService } from 'src/app/services/user/user.service';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(
    private readonly userService: UserService,
    private readonly toastService: ToastService,
    private readonly router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> {
    const role: string = route.data.role;

    return this.userService.getUser().pipe(
      map((user: UserDTO) => {
        if (user.roles.find((r: RoleDTO) => r.value === role)) {
          return true;
        } else {
          this.toastService.presentToast('You have insufficient roles.');
          return this.router.createUrlTree(['']);
        }
      })
    );
  }
}
