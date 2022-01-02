import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ViewWillEnter } from '@ionic/angular';
import { mergeMap, take } from 'rxjs/operators';
import { RoleDTO } from 'src/app/models/role/role.model';
import { UserDTO } from 'src/app/models/user/user.model';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit, ViewWillEnter {
  public user: UserDTO;
  public isLoading = true;

  constructor(private readonly userService: UserService) {}

  ionViewWillEnter(): void {
    this.refresh();
  }

  ngOnInit(): void {}

  public hasRole(r: string): boolean {
    return this.user.roles.find((role: RoleDTO) => role.value === r)
      ? true
      : false;
  }

  public update(role: boolean): void {
    this.userService
      .updateRole(role)
      .pipe(take(1))
      .subscribe((user: UserDTO) => (this.user = user));
  }

  private refresh(): void {
    this.isLoading = true;
    this.userService
      .getUser()
      .pipe(take(1))
      .subscribe((user: UserDTO) => {
        this.user = user;
        this.isLoading = false;
      });
  }
}
