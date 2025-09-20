import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ICuidadores } from '../../Interfaces/icuidadores';
import { CuidadoresService } from '../../Services/cuidadores-service';

@Component({
  selector: 'app-cuidadores',
  imports: [CommonModule, FormsModule],
  templateUrl: './cuidadores.html',
  styleUrl: './cuidadores.css'
})
export class Cuidadores implements OnInit {
  
  

  cuidadores: ICuidadores[] = [];
  showModal: boolean = false;
  modalTitle: string = '';
  isEditing: boolean = false;
  constructor(private cuidadoresService: CuidadoresService ) { }

  // Modelo para el formulario
  cuidadorForm: ICuidadores = {
    cuidadorId: 0,
    nombre: '',
    especialidad: '',
    telefono: '',
    email: ''
  };

  // Lista de especialidades disponibles
  especialidades: string[] = [
    'Educación Infantil',
    'Psicología Infantil',
    'Enfermería Pediátrica',
    'Nutrición Infantil',
    'Fisioterapia Pediátrica',
    'Terapia Ocupacional',
    'Cuidados Generales',
    'Primeros Auxilios'
  ];

  ngOnInit() {
    this.cargarCuidadores();
  }

  cargarCuidadores() {
    // Aquí deberías llamar al servicio para cargar los cuidadores desde el backend
    this.cuidadoresService.cargarTodosLosCuidadores().subscribe({
      next: (data) => {
        this.cuidadores = data;
      },
      error: (error) => {
        console.error('Error al cargar los cuidadores:', error);
      }
      
    });
  }

  abrirModalAgregar() {
    this.modalTitle = 'Agregar Nuevo Cuidador';
    this.isEditing = false;
    this.limpiarFormulario();
    this.showModal = true;
  }

  abrirModalEditar(cuidador: ICuidadores) {
    this.modalTitle = 'Editar Cuidador';
    this.isEditing = true;
    this.cuidadorForm = { ...cuidador };
    this.showModal = true;
  }

  cerrarModal() {
    this.showModal = false;
    this.limpiarFormulario();
  }

  limpiarFormulario() {
    this.cuidadorForm = {
      cuidadorId: 0,
      nombre: '',
      especialidad: '',
      telefono: '',
      email: ''
    };
  }

  guardarCuidador() {
    if (this.isEditing) {
      // Actualizar cuidador existente
      const index = this.cuidadores.findIndex(c => c.cuidadorId === this.cuidadorForm.cuidadorId);
      if (index !== -1) {
        this.cuidadoresService.editarCuidador(this.cuidadorForm).subscribe({
          next: (cuidadorActualizado) => {
            this.cuidadores[index] = { ...this.cuidadorForm };
          },
          error: (error) => {
            console.error('Error al actualizar el cuidador:', error);
          }
        });
      }
    } else {
      // Agregar nuevo cuidador
      const nuevoCuidador = {
        ...this.cuidadorForm,
        cuidadorId: this.cuidadores.length > 0 ? Math.max(...this.cuidadores.map(c => c.cuidadorId)) + 1 : 1
      };
      this.cuidadoresService.agregarCuidador(nuevoCuidador).subscribe({
        next: (cuidadorAgregado) => {
          this.cuidadores.push(cuidadorAgregado);
        },
        error: (error) => {
          console.error('Error al agregar el cuidador:', error);
        }
      });
    }
    this.cerrarModal();
  }

  eliminarCuidador(cuidadorId: number) {
    if (confirm('¿Está seguro de que desea eliminar este cuidador?')) {
      this.cuidadoresService.eliminarCuidador(cuidadorId).subscribe({
        next: () => {
          this.cuidadores = this.cuidadores.filter(c => c.cuidadorId !== cuidadorId);
        },
        error: (error) => {
          console.error('Error al eliminar el cuidador:', error);
        }

      });
    }
  }

  // Métodos para las estadísticas
  obtenerEspecialidadesUnicas(): number {
    const especialidadesUnicas = new Set(this.cuidadores.map(c => c.especialidad));
    return especialidadesUnicas.size;
  }

  contarCuidadoresPorEspecialidad(especialidad: string): number {
    return this.cuidadores.filter(c => c.especialidad === especialidad).length;
  }

  obtenerEspecialidadMasComun(): string {
    if (this.cuidadores.length === 0) return 'N/A';
    
    const conteoEspecialidades: { [key: string]: number } = {};
    this.cuidadores.forEach(c => {
      conteoEspecialidades[c.especialidad] = (conteoEspecialidades[c.especialidad] || 0) + 1;
    });
    
    let maxConteo = 0;
    let especialidadMasComun = '';
    
    for (const [especialidad, conteo] of Object.entries(conteoEspecialidades)) {
      if (conteo > maxConteo) {
        maxConteo = conteo;
        especialidadMasComun = especialidad;
      }
    }
    
    return especialidadMasComun;
  }

  validarEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  validarTelefono(telefono: string): boolean {
    const telefonoRegex = /^[+]?[\d\s\-()]+$/;
    return telefonoRegex.test(telefono) && telefono.replace(/\D/g, '').length >= 9;
  }

  formatearTelefono(telefono: string): string {
    // Formatear número de teléfono para mostrar
    return telefono.replace(/(\+\d{2})(\d{3})(\d{3})(\d{3})/, '$1 $2 $3 $4');
  }
}
