import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IAsignaciones } from '../../Interfaces/iasignaciones';
import { ICuidadores } from '../../Interfaces/icuidadores';
import { INinos } from '../../Interfaces/ininos';
import { NinosService } from '../../Services/ninos-service';
import { AsignacionesService } from '../../Services/asignaciones-service';
import { CuidadoresService } from '../../Services/cuidadores-service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gestion',
  imports: [CommonModule, FormsModule],
  templateUrl: './gestion.html',
  styleUrls: ['./gestion.css']
})
export class GestionComponent implements OnInit {


  constructor(
    private ninosService: NinosService,
    private asignacionesService: AsignacionesService,
    private cuidadoresService: CuidadoresService

  ) { }
  
  selectedCuidadorId: number | null = null;
  ninoSeleccionado: INinos | null = null;
  cuidadores: ICuidadores[] = []
  asignaciones: IAsignaciones[] = [];
  ninosDisponibles: INinos[] = [];

  show_modal: boolean = false;
  ngOnInit(): void {

    this.cargarCuidadores();
  }


  abrirModalAgregarNino() {
      this.cargarNinosDisponibles();
      this.show_modal = true;

  }
  cargarNinosDisponibles() {
      this.ninosService.cargarNinosNoAsignados().subscribe({
        next: (data) => {
          this.ninosDisponibles = data;
        }
      });
  }
  cargarCuidadores() {
    this.cuidadoresService.cargarTodosLosCuidadores().subscribe({
      next: (data) => {
        console.log('Cuidadores cargados:', data);
        this.cuidadores = data;
      }
    });
  }
  agregarNino() {
    if (this.selectedCuidadorId === null || this.ninoSeleccionado === null) {
      Swal.fire('Error', 'Por favor, selecciona un cuidador y un niño.', 'error');
      return;
    }
    const nuevaAsignacion: IAsignaciones = {
        asignacionId: 0, // El ID será asignado por el backend
        cuidadorId: this.selectedCuidadorId,
        ninoId: this.ninoSeleccionado.ninoId,
        fechaAsignacion: new Date() // Fecha actual

    };
    this.asignacionesService.agregarAsignacion(nuevaAsignacion).subscribe({
      next: (data) => {
        console.log('Asignación agregada:', data);
          Swal.fire('Éxito', 'Niño asignado correctamente.', 'success');
          this.cargarAsignacionesCuidadores(this.selectedCuidadorId!);
          this.show_modal = false;
          this.ninoSeleccionado = null; // Limpiar selección de niño
        },
        error: (error) => {
          console.error('Error al agregar la asignación:', error);
          Swal.fire('Error', 'No se pudo asignar el niño.', 'error');
        }
      });

  };

  eliminarAsignacionNino(asignacion: IAsignaciones) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Deseas eliminar la asignación del niño ${asignacion.nino?.nombre} al cuidador?`,  
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.asignacionesService.eliminarAsignacion(asignacion.asignacionId).subscribe({
          next: () => {
            Swal.fire('Eliminado', 'La asignación ha sido eliminada.', 'success');
            this.cargarAsignacionesCuidadores(this.selectedCuidadorId!);
          },
          error: (error) => {
            console.error('Error al eliminar la asignación:', error);
            Swal.fire('Error', 'No se pudo eliminar la asignación.', 'error');
          }
        });
      }
    });
  }

  cargarAsignacionesCuidadores(cuidadorId: number) {
    if (cuidadorId === null) {
      return;
    }
    this.asignacionesService.obtenerAsignacionesPorCuidador(cuidadorId).subscribe({
      next: (data) => {
        console.log('Asignaciones cargadas:', data);
        this.asignaciones= data;
        console.log('Asignaciones filtradas para el cuidadorId', cuidadorId, ':', this.asignaciones);
        console.log(JSON.stringify(this.asignaciones));
      },
      error: (error) => {
        console.error('Error al cargar las asignaciones:', error);
        Swal.fire('Error', 'No se pudieron cargar las asignaciones.', 'error');
      }
    });

  }

  onCuidadorChange() {
    if (this.selectedCuidadorId !== null) {
      console.log('Cuidador seleccionado con ID:', this.selectedCuidadorId);
      this.cargarAsignacionesCuidadores(this.selectedCuidadorId);
    }
  }
}