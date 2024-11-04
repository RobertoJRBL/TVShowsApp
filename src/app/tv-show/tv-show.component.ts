import { Component, OnInit } from '@angular/core';
import { TvShowService } from '../tv-show.service';
import { TvShowCreateDto } from '../models/tv-show-create.dto';
import { TvShow } from '../models/tv-show.model';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-tv-show',
  templateUrl: './tv-show.component.html',
  styleUrls: ['./tv-show.component.css']
})
export class TvShowComponent implements OnInit {
  tvShows: TvShow[] = [];
  currentPage: number = 1; // Página actual
  pageSize: number = 10; // Elementos por página
  newTvShow: TvShowCreateDto = { name: '', favorite: false };
  editTvShow: TvShow | null = null; // Para editar
  toastMessage: string | null = null; // Mensaje del toast
  toastType: 'success' | 'error' | 'warning' | null = null; // Tipo de mensaje

  // Filtros
  searchTerm: string = ''; // Para la búsqueda
  isFavorite: boolean | null = null; // Filtro para favoritos
  resultsPerPage: number = 10; // Cantidad de resultados por página

  constructor(private tvShowService: TvShowService) { }

  ngOnInit(): void {
    this.loadTvShows();
  }

  hasResults: boolean = true; // Para controlar si hay resultados

  loadTvShows() {
    this.tvShowService.getTvShows(this.currentPage, this.resultsPerPage, this.isFavorite, this.searchTerm).subscribe(
      data => {
        this.tvShows = data;
        this.hasResults = this.tvShows.length > 0; // Establece si hay resultados
      },
      ex => {
        this.tvShows = [];
        this.hasResults = false; // Establece que no hay resultados si hay un error
      }
    );
  }

  openModal() {
    this.resetForm();
    const modal = new bootstrap.Modal(document.getElementById('tvShowModal')!);
    modal.show(); // Muestra el modal
  }

  addTvShow() {
    this.tvShowService.addTvShow(this.newTvShow).subscribe(data => {
      this.loadTvShows();
      this.closeModal();
      this.showToast(data.message, 'success');
    }, ex => {
      this.showToast(ex.error.message, 'error');
    });
  }

  edit(tvShow: TvShow) {
    this.editTvShow = tvShow; // Asigna el programa a editar
    this.newTvShow = { ...tvShow }; // Llena el formulario con los datos del programa
    const modal = new bootstrap.Modal(document.getElementById('tvShowModal')!);
    modal.show(); // Muestra el modal
  }

  updateTvShow() {
    if (this.editTvShow) {
      this.tvShowService.updateTvShow(this.editTvShow.id!, this.newTvShow).subscribe(data => {
        this.loadTvShows();
        this.closeModal();
        this.showToast(data.message, 'success');
      }, ex => {
        this.showToast(ex.error.message, 'error');
      });
    }
  }

  confirmDelete(id: number) {
    if (confirm('¿Estás seguro de que deseas eliminar este programa?')) {
      this.deleteTvShow(id);
    }
  }

  deleteTvShow(id: number) {
    this.tvShowService.deleteTvShow(id).subscribe(data => {
      this.loadTvShows();
      this.showToast(data.message, 'success');
    }, ex => {
      this.showToast(ex.error.message, 'error');
    });
  }

  resetForm() {
    this.newTvShow = { name: '', favorite: false };
    this.editTvShow = null; // Resetea el estado de edición
  }

  closeModal() {
    const modal = bootstrap.Modal.getInstance(document.getElementById('tvShowModal')!);
    if (modal) {
      modal.hide(); // Cierra el modal
    }
  }

  showToast(message: string, type: 'success' | 'error' | 'warning') {
    this.toastMessage = message;
    this.toastType = type;
  }

  closeToast() {
    this.toastMessage = null; 
    this.toastType = null;
  }

  changePage(page: number) {
    this.currentPage = page;
    this.loadTvShows();
  }

  // Nuevos métodos para manejar filtros
  onFavoriteFilterChange(isFavorite: boolean | null) {
    this.isFavorite = isFavorite;
    this.loadTvShows();
  }

  onSearchChange() {
    this.loadTvShows();
  }

  onResultsPerPageChange() {
    this.loadTvShows();
  }
}
