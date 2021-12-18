import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserDTO } from 'src/app/models/user/user.model';
import { take } from 'rxjs/operators';
import { TokenDTO } from 'src/app/models/token/token.model';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/user/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public loginForm: FormGroup;
  public error: string;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  public get errorControl() {
    return this.loginForm.controls;
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  public login(): void {
    this.error = '';

    if (this.loginForm.valid) {
      const user: UserDTO = {
        email: '/',
        username: this.loginForm.get('username').value,
        password: this.loginForm.get('password').value,
        rating: 0,
      };

      this.authService
        .login(user)
        .pipe(take(1))
        .subscribe(
          (tokens: TokenDTO) => {
            this.authService.saveTokens(tokens).then(() => {
              this.router.navigate(['']);
            });
          },
          (error) => {
            this.error = error.error.message;
          }
        );
    }
  }
}
