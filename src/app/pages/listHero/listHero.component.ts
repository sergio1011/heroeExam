import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeroesService } from '../../service/heroes.service';
import { Hero } from '../../interface/hero.interface';
import { take } from 'rxjs';
import SearchBoxComponent from '../../components/searchBox/searchBox.component';
import ListComponent from '../../components/list/list.component';

@Component({
  selector: 'app-listHero',
  standalone: true,
  imports:  [CommonModule, RouterModule, SearchBoxComponent, ListComponent],
  templateUrl: './listHero.component.html'
})
export default class ListHeroComponent implements OnInit {

  //Variables
  public heroes:Hero[]=[];
  public cargaListAllHeroes: boolean = false;
  //Paginacion
  totalPages!:number;
  pageNumbers: number[] = [];
  itemsPage: number = 3;
  currentPage: number = 1;

  constructor(
    private heroesService: HeroesService
  ) { }

  ngOnInit() {
    this.getTotalPages();
    this.getAllHeroes();
  }

  //Obtención todos los superheroes con la paginación
  getAllHeroes():void{
    this.heroesService.getHeroesPaginator(this.currentPage, this.itemsPage).pipe(take(1)).subscribe(
      (heroes) => {
        this.heroes=heroes
        this.cargaListAllHeroes=true
      },
      (error) => {
        console.log(error);
      }
    )
  }

  //Busqueda
  uniqueSearch( searchHero :string ):void{
    if(searchHero !== ""){
      this.heroesService.getHeroById(searchHero).pipe(take(1)).subscribe(
        (hero) => {
          this.heroes = hero;
          this.cargaListAllHeroes = true;
        },
        (error) => {
          console.log(error);
        }
      );
    }else{
      this.getAllHeroes();
    }

  }

  //Formulario Añadir/Actualizar
  onSubmit():void{

  }

  //Paginación
  getTotalPages():number[]{
    this.heroesService.getHeroes().subscribe(
      (heroes) => {
        this.heroes = heroes;
        this.totalPages = Math.ceil(this.heroes.length/this.itemsPage);
        for (let i = 1; i <= this.totalPages; i++) {
          this.pageNumbers.push(i);
        }
        this.cargaListAllHeroes = false;

      },
      (error) => {
        console.log(error);
      }
    );
    return this.pageNumbers;
  }

  prevPage():void{
    if (this.currentPage > 1) {
      this.currentPage = this.currentPage-1;
      this.getAllHeroes();
    }
  }

  nextPage():void{
    if(this.currentPage == this.totalPages){
      this.getAllHeroes();
    }else{
      this.currentPage = this.currentPage+1;
      this.getAllHeroes();
    }
  }

  pageSelected(value:number):void{
    this.currentPage = value;
    this.getAllHeroes();
  }

}
