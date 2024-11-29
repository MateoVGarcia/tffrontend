import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  constructor(private route: ActivatedRoute,
    private router: Router ) { }

  ngOnInit(): void {
  }

  crearPropietario(): void {
    this.router.navigate(['/usersForm', '']);
  }

}
