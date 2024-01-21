import {Component, inject} from '@angular/core'
import {ButtonModule} from 'primeng/button'
import {InputTextModule} from 'primeng/inputtext'
import {Router, RouterLink} from '@angular/router'
import {RippleModule} from 'primeng/ripple'
import {FormsModule, NgForm} from '@angular/forms'
import { JwtDTO } from '../../core/dto/jwt.dto'
import { ApiService } from '../../core/services/api.service'
import { TokenService } from '../../core/services/token.service'
import {MessageService} from 'primeng/api'

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ButtonModule,
    InputTextModule,
    RouterLink,
    RippleModule,
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private validationFailed!: boolean

  constructor(
    private apiService: ApiService,
    private router: Router,
    private tokenService: TokenService,
    private messageService: MessageService,
  ) {}

  onSubmit(form: NgForm) {
    const {username, password} = form.value
    const signData = {
      username: username,
      password: password,
    }
    this.apiService.signIn(signData).subscribe({
      next: (resp: JwtDTO) => {
        console.log(resp);
          this.tokenService.saveToken(resp.token);
          this.router.navigate(['main']);
      },
      // TODO: Add Toasts
      error: err => {
        console.log(err);
        this.showError(err.message);
      }
  });
  }

  private showError(message: string) {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: message
    })
    this.validationFailed = true
  }
}
