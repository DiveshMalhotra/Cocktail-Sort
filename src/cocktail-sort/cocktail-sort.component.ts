import { TitleCasePipe } from '@angular/common';
import { Component, OnInit, } from '@angular/core';
import { CocktailSortService } from '../services/cocktail-sort.service'

@Component({
  selector: 'app-cocktail-sort-system',
  templateUrl: './cocktail-sort.component.html'
})

export class CocktailSortSystemComponent implements OnInit {

  /**
   * array to store selected type of cocktail
   */
  public cocktails: any[];
  /**
   * boolean value to show that drinks are being loaded
   */
  public loading: boolean;
  /**
   * array to show types of ingredients
   */
  public ingredients: any[];
  /**
   * array to show types of sorted drinks
   */
  public sortedDrinks: any[];
  /**
   * array to store type of drink types available
   */
  public drinks: Drinks[];

  constructor(
    private titlecasePipe: TitleCasePipe,
    private cocktailSortService: CocktailSortService) {
    this.cocktails = [];
    this.ingredients = [];
    this.sortedDrinks = [];
    this.drinks = [
      {
        key: 'search.php?s=margarita',
        value: 'Margarita'
      },
      {
        key: 'filter.php?i=Vodka',
        value: 'Vodka'
      },
      {
        key: 'filter.php?i=Gin',
        value: 'Gin'
      },
      {
        key: 'filter.php?a=Alcoholic',
        value: 'Alcoholic Drinks'
      },
      {
        key: 'filter.php?c=Ordinary_Drink',
        value: 'Ordinary Drink'
      },
      {
        key: 'filter.php?a=Non_Alcoholic',
        value: 'Non Alcoholic Drink'
      },
      {
        key: 'resetSelection',
        value: 'Reset Selection'
      }
    ];
  }

  /**
   * initializes the component
   * @returns void
   */
  public ngOnInit(): void { }

  /**
   * method to get cocktail data
   * @param drinkType string
   * @returns void
   */
  public getCocktailDetails(drinkType: string): void {
    if (drinkType === '' || drinkType === 'resetSelection') {
      this.resetAll();
      return;
    }
    this.cocktails = [];
    this.loading = true;
    this.cocktailSortService.getApiData(drinkType).subscribe((data) => {
      data.drinks.filter((drink) => {
        this.cocktails.push(drink);
        drinkType.includes('margarita') ? this.getIngredients(drink) : this.ingredients = [];
      });
      this.sortedDrinks = [];
      this.loading = false;
    });
  }

  /**
   * method to get filtered cocktails as per selection
   * @param type string
   * @returns void
   */
  public filteredCocktail(type: string): void {
    this.sortedDrinks = [];
    this.cocktails.filter((drink) => {
      for (const key in drink) {
        const ingredient = this.titlecasePipe.transform(drink[key]);
        if (ingredient === type) {
          this.sortedDrinks.push(drink);
        }
      }
    });
  }

  /**
   * method to get types of ingredients as per drinks
   * @param drink 
   * @returns void
   */
  private getIngredients(drink): void {
    for (const key in drink) {
      const ingredient = this.titlecasePipe.transform(drink[key]);
      if (key.includes('strIngredient') && drink[key] !== null && !this.ingredients.includes(ingredient)) {
        this.ingredients.push(ingredient);
      }
    }
  }

  /**
   * method to reset all selection
   * @returns void
   */
  private resetAll(): void {
    this.cocktails = [];
    this.ingredients = [];
    this.sortedDrinks = [];
    this.loading = false;
  }
}

interface Drinks {
  key: string;
  value: string;
};