import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { AuthService } from 'src/app/services/user/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  constructor(private readonly authService: AuthService) {}

  ngOnInit() {}

  public test(): void {
    this.authService
      .test()
      .pipe(take(1))
      .subscribe((result: string) => console.log(result));
  }
}
