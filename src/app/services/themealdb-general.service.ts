import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, shareReplay } from 'rxjs';
import { map } from 'rxjs/operators';
import { Meal } from '../common/meal';

interface CategoryResponse {
  meals: { strCategory: string }[];
}

@Injectable({
  providedIn: 'root'
})
export class ThemealdbGeneralService {
  private categories$: Observable<string[]> | null = null;
  private baseUrl = 'https://www.themealdb.com/api/json/v1/1';

  constructor(private http: HttpClient) { }

  getCategories(): Observable<string[]> {
    if (!this.categories$) {
      this.categories$ = this.http.get<CategoryResponse>(
        'https://www.themealdb.com/api/json/v1/1/list.php?c=list'
      ).pipe(
        map(response => response.meals.map(meal => meal.strCategory)),
        shareReplay(1) 
      );
    }
    return this.categories$;
  }

  getMealsByCategoryName(categoryName: string): Observable<Meal[]> {
    return this.http.get<{ meals: any[] }>(`${this.baseUrl}/filter.php?c=${categoryName}`)
      .pipe(
        map(response => 
          response.meals ? response.meals.map(meal => new Meal(meal.idMeal, meal.strMeal, meal.strMealThumb)) : []
        )
      );
  }

  getRandomRecipe(){
    return this.http.get<{ meals: any[] }>(`https://www.themealdb.com/api/json/v1/1/random.php`)
      .pipe(
        map(response => 
          response.meals ? response.meals.map(meal => new Meal(meal.idMeal, meal.strMeal, meal.strMealThumb)) : []
        )
      );
  }
}