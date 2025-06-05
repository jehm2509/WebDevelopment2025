
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '@/auth/auth.service';
import { ILoginResponse } from '@/core/interfaces/http.interface';
import { ROUTES } from '@/core/constants/routes.constants';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterLink],
  templateUrl: './login.component.html',
})
export class LoginComponent {

  email = '';
  password = '';
  error: string | null = null;
  routes = ROUTES;

  constructor(private auth: AuthService, private router: Router,private cdr: ChangeDetectorRef) {}
  login() {
    this.auth.login(this.email, this.password).subscribe({
      next: (res: ILoginResponse) => {
        this.auth.saveToken(res.token ?? '');
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.error = "Invalid login data";
        this.cdr.detectChanges();
      }
    });
  }
}
