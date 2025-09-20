import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { INinos } from '../../Interfaces/ininos';
import { NinosService } from '../../Services/ninos-service';

@Component({
  selector: 'app-ninos-component',
  imports: [CommonModule, FormsModule],
  templateUrl: './ninos.html',
  styleUrls: ['./ninos.css']
})
export class NinosComponent implements OnInit {
  constructor(private ninoService: NinosService) { }

  ninos: INinos[] = [];
  showModal: boolean = false;
  modalTitle: string = '';
  isEditing: boolean = false;
  
  // Modelo para el formulario
  ninoForm: INinos = {
    ninoId: 0,
    nombre: '',
    apellido: '',
    fechaNacimiento: new Date(),
    alergias: ''  
  };

  ngOnInit() {
    this.cargarNinos();
  }

  cargarNinos() {
    this.ninoService.obtenerTodosLosNinos().subscribe({
      next: (data) => {
        this.ninos = data;
      },
      error: (error) => {
        console.error('Error al cargar los niños desde el servidor:', error);
        console.log('Cargando datos de ejemplo...');
        // Cargar datos de ejemplo si el backend no está disponible
        
      }
    });
  }

  

  abrirModalAgregar() {
    this.modalTitle = 'Agregar Nuevo Niño';
    this.isEditing = false;
    this.limpiarFormulario();
    this.showModal = true;
  }

  abrirModalEditar(nino: INinos) {
    this.modalTitle = 'Editar Niño';
    this.isEditing = true;
    this.ninoForm = { ...nino };
    this.showModal = true;
  }

  cerrarModal() {
    this.showModal = false;
    this.limpiarFormulario();
  }

  limpiarFormulario() {
    this.ninoForm = {
      ninoId: 0,
      nombre: '',
      apellido: '',
      fechaNacimiento: new Date(),
      alergias: ''
    };
  }

  guardarNino() {
    if (this.isEditing) {
      // Actualizar niño existente
      this.ninoService.actualizarNino(this.ninoForm).subscribe({
        next: (ninoActualizado) => {
          const index = this.ninos.findIndex(n => n.ninoId === this.ninoForm.ninoId);
          if (index !== -1) {
            this.ninos[index] = { ...this.ninoForm };
          }
          this.cerrarModal();
        },
        error: (error) => {
          console.error('Error al actualizar el niño en el servidor:', error);
          console.log('Actualizando localmente...');
          // Fallback: actualizar localmente
          const index = this.ninos.findIndex(n => n.ninoId === this.ninoForm.ninoId);
          if (index !== -1) {
            this.ninos[index] = { ...this.ninoForm };
          }
          this.cerrarModal();
        }
      });
    } else {
      // Agregar nuevo niño
      console.log(JSON.stringify(this.ninoForm));
      this.ninoService.agregarNino(this.ninoForm).subscribe({
        next: (nuevoNino) => {
          this.ninos.push(nuevoNino);
          this.cerrarModal();
        },
        error: (error) => {
          console.error('Error al agregar el niño en el servidor:', error);
          console.log('Agregando localmente...');
          // Fallback: agregar localmente
          const nuevoNino = {
            ...this.ninoForm,
            ninoId: this.ninos.length > 0 ? Math.max(...this.ninos.map(n => n.ninoId)) + 1 : 1
          };
          this.ninos.push(nuevoNino);
          this.cerrarModal();
        }
      });
    }
  }

  eliminarNino(ninoId: number) {
    if (confirm('¿Está seguro de que desea eliminar este niño?')) {
      this.ninoService.eliminarNino(ninoId).subscribe({
        next: () => {
          this.ninos = this.ninos.filter(n => n.ninoId !== ninoId);
        },
        error: (error) => {
          console.error('Error al eliminar el niño del servidor:', error);
          console.log('Eliminando localmente...');
          // Fallback: eliminar localmente
          this.ninos = this.ninos.filter(n => n.ninoId !== ninoId);
        }
      });
    }
  }

  formatearFecha(fecha: Date): string {
    return new Date(fecha).toLocaleDateString('es-ES');
  }

  calcularEdad(fechaNacimiento: Date): number {
    const hoy = new Date();
    const nacimiento = new Date(fechaNacimiento);
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const mes = hoy.getMonth() - nacimiento.getMonth();
    
    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
      edad--;
    }
    
    return edad;
  }

  // Métodos para las estadísticas
  obtenerEdadPromedio(): number {
    if (this.ninos.length === 0) return 0;
    const sumaEdades = this.ninos.reduce((sum, nino) => sum + this.calcularEdad(nino.fechaNacimiento), 0);
    return Math.round((sumaEdades / this.ninos.length) * 10) / 10;
  }

  contarNinosConAlergias(): number {
    return this.ninos.filter(nino => 
      nino.alergias && 
      nino.alergias.trim() !== '' && 
      nino.alergias.toLowerCase() !== 'ninguna'
    ).length;
  }

  contarNinosMenoresTresAnos(): number {
    return this.ninos.filter(nino => this.calcularEdad(nino.fechaNacimiento) < 3).length;
  }
}
