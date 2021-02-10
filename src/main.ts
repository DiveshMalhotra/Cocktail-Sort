import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { CocktailSortSystemModule } from './cocktail-sort/cocktail-sort.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(CocktailSortSystemModule)
  .catch(err => console.log(err));
