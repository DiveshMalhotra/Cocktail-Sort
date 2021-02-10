import { TitleCasePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-cocktail-sort-system',
  templateUrl: './cocktail-sort.component.html',
  styles: []
})
export class CocktailSortSystemComponent implements OnInit {

  public cocktails: any[];

  public loading: string;

  public ingredients: any[];

  public sortedDrinks: any[];
  
  constructor(private router: Router, private http: HttpClient, private titlecasePipe: TitleCasePipe) {
    this.cocktails = [];
    this.ingredients = [];
    this.sortedDrinks = [];
  }

  public ngOnInit() {  }

  public getApiData(url): Observable<any> {
    url = `https://www.thecocktaildb.com/api/json/v1/1/${url}`;
    return this.http.get(url);
  }

  public getCocktailDetails(url: string): void {
    this.cocktails = [];
    this.loading = 'Loading Drinks';
    this.getApiData(url).subscribe((data) => {
      data.drinks.filter((drink) => {
        this.cocktails.push(drink);
        for (const key in drink) {
          const ingredient = this.titlecasePipe.transform(drink[key]);
          if (key.includes('strIngredient') && drink[key] !== null && !this.ingredients.includes(ingredient)) {            
            this.ingredients.push(ingredient);
          }
        }
      });
      this.sortedDrinks = [];
      this.loading = '';
    });
  }

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
}
