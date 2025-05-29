
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@/auth/auth.service';
import { ILogin } from '@/core/interfaces/http.interface';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {

  email = '';
  password = '';
  error: string | null = null;

  constructor(private auth: AuthService, private router: Router) {}

  login() {
    this.auth.login(this.email, this.password).subscribe({
      next: (res: ILogin) => {
        this.auth.saveToken(res.token ?? '');
        this.router.navigate(['/admin']);
      },
      error: (err: ILogin) => {
        this.error = err.message;
      }
    });
  }
}
