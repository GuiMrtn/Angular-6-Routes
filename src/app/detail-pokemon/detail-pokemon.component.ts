//Ici, on va faire correspondre ce composant avec la route pokemon/:id déclarée dans le app.routing.module.ts
import { Component, OnInit } from '@angular/core';
//On importe le router
import { ActivatedRoute, Router } from '@angular/router';
//On importe la liste de tous les pokémons
import { POKEMONS } from '../mock-pokemon-list';
//On importe la liste des pokemons
import { Pokemon } from '../pokemon';

@Component({
  selector: 'app-detail-pokemon',
  templateUrl: './detail-pokemon.component.html',
})

export class DetailPokemonComponent implements OnInit {

  //On déclare la propriété pokemonList et on importe la liste
  pokemonList: Pokemon[];

  //On initialise le pokemon courant, celui demandé par l'utilisateur, via l'URL en identifiant. on type aussi sur undefined car on peut avoir un pokémon non trouvé
  pokemon: Pokemon|undefined;

  //Ici, on va vouloir récupérer l'id déclaré dans l'URL et renvoyer le pokemon correspondant. On passe donc par le constructeur car il nous faut un service pour piloter les routes. Grace à cela on va pouvoir accéder à l'identifiant qui est dans la route, donc l'id qui est dans l'URL
  constructor(private route: ActivatedRoute, private router: Router) { }

  //Pour faire cela, on va aller dans le ngOnInit, c'est à dire qu'à l'initialisation du composant, la première chose que nous voudons faire, c'est d'aller chercher l'identifiant placé dans l'URL, de le récupérer, d'aller chercher le pokemon correspondant et de le pousser dans le template pour l'afficher
  ngOnInit(): void {
    //Ici, on initialise la liste des pokémons
    this.pokemonList = POKEMONS;
    //Pour récupérer l'identifiant, on déclare une constante pokemonId et on va faire appel au router pour récupérer l'identifiant. Snapshot permet de récupérer la donnée à l'instant T et de récupérer des paramètres, ce qui est appelé paramMap (tableau avec tous les paramètres de l'URL). Puis on fait un .get() pour chercher l'identifiant qui s'appelle id. On type à string pour le moment pour éviter les erreurs
    const pokemonId: string|null = this.route.snapshot.paramMap.get("id");

    //Ensuite, on va aller chercher dans la liste des pokémons celui qui correspond à l'identifiant demandé. Dans un premier temps, on importe la liste de tous les pokemons. Puis on aura besoin d'une propriété pokemonList déclarée ci-dessus et celui demandé par l'utilisateur (c'est-à-dire le pokemon counat : pokemon: Pokemon déclaré ci-dessus) ou undefined s'il n'existe pas. Puis on parcours la liste des pokemons et on va chercher le pokémon qui a comme identifiant demandé par l'utilisateur. Le problème c'est qu'on aura une erreur si on créé pas une condition
    if(pokemonId) {
      this.pokemon = this.pokemonList.find(pokemon => pokemon.id == +pokemonId)
    } else {
      //On gère le cas où on n'a pas de pokemonId. On pourrait même supprimer cela car on a typé notre variable plus au à undefined
      this.pokemon = undefined;
    }
  }

  //On ajoute ici la méthode. Mais pour rediriger l'utilisateur vers la liste complète des pokémons, il faut créer dans le constructeur un service router
  goToPokemonList() {
    //Puis on appelle le router et sa propriété navigate et l'URL de sa redirection. La particularité est que cela se fait dans un tableau. Ainsi quand l'utilisateur cliqura sur le bouton retour, il sera redirigé vers la liste des pokémons
    this.router.navigate(["/pokemons"]);
  }
}

//Maintenant, on va construire le template autour de la propriété pokemon (pokemon: Pokemon|undefined) dans le fichier detail-pokemon.component.html
