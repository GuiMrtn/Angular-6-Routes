//Ici, on va vouloir modifier la couleur des étiquettes selon que les pokémons sont de type eau, feu, plante etc...
//Pour générer un pipe, il suffit de faire la commande ng generate pipe nom-du-pipe

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pokemonTypeColor'
})

export class PokemonTypeColorPipe implements PipeTransform {
  //Ici, dans le transform, on reçoit en entrée, le type du pokemon : type:string, qui sera soit feu, soit eau, soit plante etc... Le but est de transformer ce type en une couleur
  transform(type: string): string {
  
    let color: string;
  
    switch (type) {
      case 'Feu':
        color = 'red lighten-1';
        break;
      case 'Eau':
        color = 'blue lighten-1';
        break;
      case 'Plante':
        color = 'green lighten-1';
        break;
      case 'Insecte':
        color = 'brown lighten-1';
        break;
      case 'Normal':
        color = 'grey lighten-3';
        break;
      case 'Vol':
        color = 'blue lighten-3';
        break;
      case 'Poison':
        color = 'deep-purple accent-1';
        break;
      case 'Fée':
        color = 'pink lighten-4';
        break;
      case 'Psy':
        color = 'deep-purple darken-2';
        break;
      case 'Electrik':
        color = 'lime accent-1';
        break;
      case 'Combat':
        color = 'deep-orange';
        break;
      default:
        color = 'grey';
        break;
    }
  
    //Ici on retourne une classe qui provient de materialize. On combine une classe qui s'appelle chip et qui permet d'afficher un petit rond de couleur et la couleur correspondant au type du pokémon
    return 'chip ' + color;
  
  }
}

//Une fois terminé, on peut utiliser notre pipe dans le template app.component.html
