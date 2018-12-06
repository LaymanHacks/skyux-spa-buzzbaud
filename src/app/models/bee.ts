
export class Bee {
  public name: string;
  public description: string;
  public genus: string;
  public species: string;
  public deadly?: boolean;
  public alias?: string;
  public communal?: boolean;
  public image_url: string;
  public endangered?: boolean;
  public id: string;
  constructor(
     name: string,
     description: string,
     genus: string,
     species: string,
     imageUrl: string,
     id: string,
     deadly?: boolean,
     alias?: string,
     communal?: boolean,
     endangered?: boolean
    ) {
      this.name = name;
    this.description = description;
    this.genus = genus;
    this.species = species;
    this.deadly = deadly;
    this.alias = alias;
    this.communal = communal;
    this.image_url = imageUrl;
    this.endangered = endangered;
    this.id = id;

  }
}
