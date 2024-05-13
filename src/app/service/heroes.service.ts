import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of, map } from 'rxjs';
import { Hero } from '../interface/hero.interface';

@Injectable({
  providedIn: 'root'
})

export class HeroesService {

  private baseUrl: string = environment.baseUrl

  constructor(private  http: HttpClient) { }

  // Consultar todos los super héroes
  getHeroes():Observable<Hero[]>{
    return this.http.get<Hero[]>(`${this.baseUrl}/heroes`)
  }

  // Paginador
  getHeroesPaginator(page: number, pageSize: number):Observable<Hero[]>{
    return this.http.get<Hero[]>(`${this.baseUrl}/heroes?_page=${page}&_limit=${pageSize}`)
  }

  // Busqueda
  getHeroById(id:string):Observable<Hero[]>{
    return this.http.get<Hero[]>(this.baseUrl + '/heroes').pipe(
      map((hero: Hero[]) => {
        return hero.filter(hero => {
          const titleJSON = hero.id.replace(/[^\w\s]/gi, '').toLowerCase();
          const titleSearch = id.replace(/[^\w\s]/gi, '').toLowerCase();
          /** Realiza la comparación */
          return titleJSON.includes(titleSearch);
        });
      })
    );
  }

  // Añadir Héroe
  addHero(hero:Hero):Observable<Hero>{
    return this.http.post<Hero>(`${this.baseUrl}/heroes`,hero);
  }

  // Modificar Héroe
  updateHero(hero:Hero):Observable<Hero>{
    if(!hero.id) throw Error('Hero id is required');
    return this.http.patch<Hero>(`${this.baseUrl}/heroes/${hero.id}`,hero);
  }

  // Eliminar Héroe
  deleteHeroById(id:string):Observable<boolean>{
    return this.http.delete(`${this.baseUrl}/heroes/${id}`).pipe(
      map( resp => true ),
      catchError( err => of(false) )
    );
  }
}

