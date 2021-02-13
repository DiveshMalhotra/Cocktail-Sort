import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class CocktailSortService {
    constructor(private http: HttpClient) { }

    /**
     * method to make api call and fetch data
     * @param url string
     * @returns Observable<any>
     */
    public getApiData(drinkType: string): Observable<any> {
        if (drinkType.length === 1) {
            return this.getDrinksWithInitialAlphabet(drinkType);
        }
        drinkType = `https://www.thecocktaildb.com/api/json/v1/1/${drinkType}`;
        return this.http.get(drinkType).pipe(
            retry(1),
            catchError(this.errorHandler)
        );
    }

    /**
     * method to get results on basis of initial alphabet entered
     * @param initialAlphabet string
     * @returns Observable<any>
     */
    public getDrinksWithInitialAlphabet(initialAlphabet: string): Observable<any> {
        const params = { f: initialAlphabet };
        return this.http.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php`, { params: params })
            .pipe(
                retry(1),
                catchError(this.errorHandler)
            );
    }

    /**
     * method to get error if API fails
     * @param error error
     */
    private errorHandler(error) {
        let errorMessage = '';
        if (error.error) {
            errorMessage = error.error.message;
        } else {
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        console.log(errorMessage);
        return throwError(errorMessage);
    }
}