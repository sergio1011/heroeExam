import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HeroesService } from '../../service/heroes.service';
import { Hero } from '../../interface/hero.interface';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { subscribe } from 'diagnostics_channel';
import { error } from 'console';

@Component({
  selector: 'app-form',
  standalone: true,
  imports:[ReactiveFormsModule, RouterModule],
  templateUrl: './form.component.html'
})
export default class FormComponent implements OnInit{

  public id = String(this.route.snapshot.paramMap.get('id'));
  public cargaForm:boolean = false;
  public hero:Hero[]=[];

  public heroForm = new FormGroup({
    id: new FormControl('', [Validators.required]),
    superhero: new FormControl('', [Validators.required]),
    alter_ego: new FormControl('',[Validators.required]),
    first_appearance: new FormControl('', [Validators.required])
  });

  constructor(
    private heroService:HeroesService,
    private router:Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    if(this.id !== 'null'){
      console.log(this.id)
      this.getHeroe();
    }else{
      this.cargaForm = true;
    }
  }
  //Conseguir el heroe concreto con el id
  getHeroe():void{
    this.heroService.getHeroById(this.id).subscribe(
      (hero) =>{
          this.hero = hero
          //Dar valor al id cuando sea actualizar
          this.heroForm.patchValue({
            id: this.hero[0].id
          });
          this.cargaForm = true;
      }, (error) => {
        console.log(error);
      }
    )
  }

  get currentHero(): Hero {
    const hero = this.heroForm.value as Hero;
    return hero;
  }

  onSubmit():void{
    if(this.heroForm.invalid) return

    this.currentHero.superhero = this.currentHero.superhero.toUpperCase();

    if(this.id === 'null'){
      this.heroService.addHero( this.currentHero ).subscribe(
        (hero) => {
          this.router.navigate(['/home'])
        },
        (error) =>{
          console.log(error)
        }
      )
    }else{
      this.heroService.updateHero(this.currentHero).subscribe(
        (hero) => {
          this.router.navigate(['/home'])
        },
        (error) =>{
          console.log(error)
        }
      )
    }

  }

}
