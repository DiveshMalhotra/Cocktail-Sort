import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CocktailSortSystemComponent } from './cocktail-sort.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { COCKTAIL_SORT_SYSTEM_ROUTES } from './cocktail-sort-routes';
import { HttpClientModule } from '@angular/common/http';
import { TitleCasePipe } from '@angular/common';

@NgModule({
  declarations: [
    CocktailSortSystemComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    HttpClientModule,
    RouterModule.forRoot(COCKTAIL_SORT_SYSTEM_ROUTES),
  ],
  providers: [TitleCasePipe],
  bootstrap: [CocktailSortSystemComponent]
})
export class CocktailSortSystemModule { }
