import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-form-user',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './form-user.component.html',
  styleUrl: './form-user.component.css'
})
export class FormUserComponent {


  accion = "";
  nuevos!: any;
  id: any;


  // Removed duplicate ngOnInit method

  userForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required]]

  });
  toastr: any;

  constructor(private fb: FormBuilder, private userService: UsersService, private router: Router, private activateRoute: ActivatedRoute,) {
  }

  ngOnInit(): void {
    this.activateRoute.params.subscribe(params => {
      if (params['id'] == "") {
        this.accion = "add";
      } else {
        this.accion = "edit";
        this.getUserById(params['id']);
        this.id = params['id'];
      }
    })
    // Suscripcion a los cambios en el formGroup para tomar los valores actualizados
    this.userForm.valueChanges.subscribe((nuevosValores) => {
      this.nuevos = nuevosValores;
      console.log('Nuevos valores:', nuevosValores);
    });
  };


  crearUsuario() {
    this.userService.createUsuario(this.userForm.value).subscribe({
      next: (response) => {
        console.log(response);
        if (response.status === '0') { // Verifica el campo 'status' del objeto JSON
          this.toastr.success('Usuario creado con exito');
        }
      },
      error: (err) => {
        console.log(err);
        this.toastr.error('No se ha podido crear el Usuario, intenta en un momento');
      }
    })
  }

  updateUser() {
    this.userService.updateUsuario(this.id, this.userForm.value).subscribe({
      next: (response) => {
        console.log(response);
        if (response.status === '0') { // Verifica el campo 'status' del objeto JSON
          this.toastr.success('Usuario actualizado con exito');
        }
      },
      error: (err) => {
        console.log(err);
        this.toastr.error('No se ha podido actualizar el Usuario, intenta en un momento');
      }
    })
  }

  getUserById(id: string) {
    this.userService.getUsuario(id).subscribe({
      next: (response) => {
        // console.log(response); 
        this.userForm.patchValue(response);
      },
      error: err => {
        console.log(err);
      }
    })
  }
}
