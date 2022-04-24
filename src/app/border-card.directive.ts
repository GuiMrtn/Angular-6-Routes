//Ici on a créé une directive qui sera utilisée pour créer une bordure colorée pour nos éléments quand l'utilisateur survolera la carte, pour avoir des cartes de même dimensions.
// Pour cela on a fait la commande ng generate directive nom-de-la-directive.
//Ici, on aimerait que quand l'utilisateur survole une carte, la bordure devienne solide, de 4px et de couleur verte. On va devoir y ajouter un évènement de type mouse. Avant cela, on importe le HostListener.
//Pour personnaliser la couleur d'une bordure, on va ajouter un input, qu'on va importer d'abord. Puis le déclarer au-dessous du constructeur.
import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[pkmnBorderCard]'
})
export class BorderCardDirective {

  //Ex : 1.On déclare 3 variables : la première stocke la couleur initiale, c'est-à-dire #F5F5F5, la seconde la couleur par défaut, #099688, et la troisième la hauteur par défaut, c'est à dire 180px.
  private initialColor: string = "#F5F5F5";
  private defaultColor: string = "#009688";
  private defaultHeight: number = 180;


  //Ici on récupère un élément, ici la carte qui sera survolée par l'utilisateur. Cela est possible grace à ElemenrRef.
  constructor(private el: ElementRef) {
    //Ici on appelle les 2 méthodes setHeight et setBorder

    // this.setHeight(180);
    // this.setBorder("#F5F5F5");

    //EX : 2.On modifie les données du constructeur
    this.setBorder(this.initialColor);
    this.setHeight(this.defaultHeight);
   }

  //Pour personnaliser la couleur, on sélectionne le input avec le nom du selecteur de la directive, puis on déclare une propriété borderColor, de type string. Ceci est un alias qui permet de définir une propriété, ici borderColor, est de la nommer où on le souhaite dans la directive. Il ne faut pas oublier de mettre le nom de la directive, ici pkmnBorderCard, dans les () de l'imput
  @Input("pkmnBorderCard") borderColor: string; //avec alias

  // @Input() pkmnBorderCard: string //sans alias, pas pratique
  
  //On utilise HostListener pour y appliquer l'évènement mouseenter
  @HostListener("mouseenter") onMouseEnter() {
    //Quand cet évènement aura été appelé, c-est-à-dire quand la carte sera survolée, on appellera notre méthode setBorder() et on mettra la couleur sur #009688.
    //Pour personnaliser la couleur, plutôt que d'attribuer une seule valeur par défaut comme ceci : 

    // this.setBorder("#009688");

    //On fera ceci : on attribuera à la bordure, la couleur qu'on entrera dans le template (app.component.html). On laisse quand même la couleur par défaut dans le cas où rie n'a été entré

    // this.setBorder(this.borderColor || "#009688")

    //EX 3.On modifie la valeur #009688
    this.setBorder(this.borderColor || this.defaultColor);
  }

  //On fait exactement la même chose quand la souris de l'utilisateur quittera la carte pour la réinitialiser à sa couleur d'origine
  @HostListener("mouseleave") onMouseLeave() {
    // this.setBorder("#F5F5F5");

    //Ex 4.On remplace #F5F5F5 par initialColor
    this.setBorder(this.initialColor)
  }

  //Puis on va définir 2 méthodes : setBorder qui va changer le comportement de la carte (ici des bordures de couleur) et une méthode setHeight qui permettra d'avoir des cartes de la même hauteur

  //setHeight prend comme paramètre la hauteur, de type number car on récupère des pixels. Ici, on veut définir la hauteur du ElementRef à un certain nombre de px. nativeElement permet d'intervenir sur l'élément natif du DOM sur lequel on souhaite intéragir. Puis on lui applique un style et une hauteu qui sera égale à la hauteur qu'on aura passée en paramètre. si on appelle setHeight(100), on aura une taille de 100px pour notre élément

  private setHeight(height: number){
    this.el.nativeElement.style.height = height + "px";
  }

  //On fait exactement pareil pour la couleur de la bordure
  private setBorder(color: string){
    let border = "solid 4px " + color;
    this.el.nativeElement.style.border = border;
  }

}

//Une fois la directive créée, il ne suffit plus qu'à l'appeler dans notre composant, ici, dans app.component.html