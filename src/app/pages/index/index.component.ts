import {Component, inject} from '@angular/core'
import {ButtonModule} from 'primeng/button'
import {RouterLink} from '@angular/router'
import {RippleModule} from 'primeng/ripple'
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [
    ButtonModule,
    RouterLink,
    RippleModule
  ],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent {
  constructor(
    public authService: AuthService
    ) {}
}
