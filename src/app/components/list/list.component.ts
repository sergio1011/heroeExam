import { Component, Input, OnInit } from '@angular/core';
import { Hero } from '../../interface/hero.interface';
import { HeroesService } from '../../service/heroes.service';
import { take } from 'list';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-list',
  standalone: true,
  imports:[
    RouterModule
  ],
  templateUrl: './list.component.html'
})
export default class ListComponent implements OnInit{

  @Input() public hero!:Hero
  public cargaBorrado:boolean = false;

  constructor(
    private heroesService: HeroesService
  ){}

  ngOnInit(): void {
    if(!this.hero) throw Error('Hero property is required');
  }

  openConfirmationModal(id: string) {
    if (confirm("¿Estás seguro de que deseas eliminar este héroe?")) {
      this.deleteHero(id);
    }
  }

  deleteHero(id:string):void{
    if( !this.hero.id) throw Error('Hero id is required');
    console.log(id);
    this.heroesService.deleteHeroById(id).subscribe(
      (hero)=>{
        window.location.reload();
        this.cargaBorrado=true;
      }
    )
  }
}
