import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { POKEMONS } from '../mock-pokemon-list';
import { Pokemon } from '../pokemon';

@Component({
  selector: 'app-list-pokemon',
  templateUrl: './list-pokemon.component.html',
  styles: [
  ]
})
export class ListPokemonComponent {
  //On déclare la liste de pokémons et on importe le tout. On n'a pas besoin du reste car dans le template, on n'a que la pokemonList et nous n'avons pas d'évènements
  pokemonList: Pokemon[] = POKEMONS;

  //Ici, on aimerait que si on clique sur une carte de pokémons, nous soyons dirigés vers la page du pokémons en question. Dans un premier temps, nous allons déclarer le router dans le constructeur.
  constructor(private router: Router) {}

  //Puis on va déclarer une méthode goToPokemon, avec en paramètre un pokemon, de type Pokemon
  goToPokemon(pokemon: Pokemon) {
    //Ici on fait exatement ce que nous avons fait dans detail-pokemon.component.ts, sauf qu'on doit passer un identifian
    this.router.navigate(["/pokemon", pokemon.id])
    //Ensuite, cette méthode, nous allons la lier avec le template
  }
}
