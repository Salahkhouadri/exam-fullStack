import { Component } from '@angular/core';
import { CategorySidebarComponent } from "./category-sidebar/category-sidebar.component";
import { RecipeListComponent } from "./recipe-list/recipe-list.component";

@Component({
  selector: 'app-container',
  standalone: true,
  imports: [CategorySidebarComponent, RecipeListComponent],
  templateUrl: './container.component.html',
  styleUrl: './container.component.css'
})
export class ContainerComponent {
  selectedCategory: string = '';

  onCategoryChange(category: string) {
    this.selectedCategory = category;
  }

  random(){
    this.selectedCategory ='random';
  }

  send(){
    console.log('no me queda tiempo para hacer esto');
  }
}
