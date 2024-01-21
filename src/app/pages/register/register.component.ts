import {Component, inject} from '@angular/core'
import {FormsModule, NgForm} from '@angular/forms'
import {PasswordModule} from 'primeng/password'
import {ButtonModule} from 'primeng/button'
import {MessageService} from 'primeng/api'
import {InputTextModule} from 'primeng/inputtext'
import {Router, RouterLink} from '@angular/router'
import {RippleModule} from 'primeng/ripple'
import { JwtDTO } from '../../core/dto/jwt.dto'
import { ApiService } from '../../core/services/api.service'
import { TokenService } from '../../core/services/token.service'

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    InputTextModule,
    PasswordModule,
    FormsModule,
    ButtonModule,
    RouterLink,
    RippleModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  constructor(
    private apiService: ApiService,
    private router: Router,
    private tokenService: TokenService,
    private messageService: MessageService,
  ) {}

  private validationFailed!: boolean

  onSubmit(form: NgForm) {
    const {username, password, passwordConfirmation} = form.value

    this.validationFailed = false
    if (username == null || username.length < 6 || username.length > 20)
      this.showError('Username must be between 6 and 20 characters')
    if (username != null && !/^[a-z0-9_]+$/i.test(username))
      this.showError('Username must contain only letters, numbers and underscores')
    if (password != passwordConfirmation)
      this.showError('Passwords don\'t match')
    if (password == null || password.length < 8 || password.length > 32)
      this.showError('Password must be between 8 and 32 characters')
    if (this.validationFailed) return

    const signUpData = {
      username: username,
      password: password,
    };

    this.apiService.signUp(signUpData).subscribe({
        next: (resp: JwtDTO) => {
            this.tokenService.saveToken(resp.token);
            console.log(resp.token);
            this.router.navigate(['main']);
        },
        //TODO: add Toasts
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
