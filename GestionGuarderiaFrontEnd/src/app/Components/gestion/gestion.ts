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
  cuidadores: ICuidadores[] = []
  ninos: INinos[] = [];
  asignaciones: IAsignaciones[] = [];
  ngOnInit(): void {

    this.cargarCuidadores();
  }

  cargarCuidadores() {
    this.cuidadoresService.cargarTodosLosCuidadores().subscribe({
      next: (data) => {
        console.log('Cuidadores cargados:', data);
        this.cuidadores = data;
      }
    });
  }

  cargarAsignacionesCuidadores(){
    if (this.selectedCuidadorId === null) {
      return;
    }
    this.asignacionesService.obtenerTodasLasAsignaciones().subscribe({
      next: (data) => {
        console.log('Asignaciones cargadas:', data);
        
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
      this.cargarAsignacionesCuidadores();
    }
  }
}