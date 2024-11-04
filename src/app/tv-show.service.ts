import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TvShowCreateDto } from './models/tv-show-create.dto';
import { TvShow } from './models/tv-show.model';

@Injectable({
    providedIn: 'root',
})
export class TvShowService {
    private apiUrl = 'http://localhost:5256/api/TvShows'; // Cambia la URL si es necesario

    constructor(private http: HttpClient) {}

    getTvShows(
        pageNumber: number = 1,
        pageSize: number = 10,
        isFavorite: boolean | null = null,
        search: string = ''
    ): Observable<any> {
        const params: any = {
            pageNumber: pageNumber.toString(),
            pageSize: pageSize.toString(),
        };

        // Agregar filtros opcionales
        if (isFavorite !== null) {
            params.isFavorite = isFavorite.toString();
        }

        if (search) {
            params.search = search;
        }

        return this.http.get(this.apiUrl, { params });
    }

    addTvShow(tvShow: TvShowCreateDto): Observable<any> {
        return this.http.post(this.apiUrl, tvShow);
    }

    updateTvShow(id: number, tvShow: TvShow): Observable<any> {
        return this.http.put(`${this.apiUrl}/${id}`, tvShow);
    }

    deleteTvShow(id: number): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${id}`);
    }
}
