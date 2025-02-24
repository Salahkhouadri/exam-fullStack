import { Component, EventEmitter, inject, Output } from '@angular/core';
import { ThemealdbGeneralService } from '../../services/themealdb-general.service';
import { NgFor, TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-category-sidebar',
  standalone: true,
  imports: [NgFor, TitleCasePipe],
  templateUrl: './category-sidebar.component.html',
  styleUrl: './category-sidebar.component.css'
})
export class CategorySidebarComponent {

  categories: string[] = [];
  @Output() categorySelected = new EventEmitter<string>();

  private mealService: ThemealdbGeneralService = inject(ThemealdbGeneralService);

  ngOnInit(): void {
    this.mealService.getCategories().subscribe(categories => {
      this.categories = categories;
      console.log(categories);
    });
  }

  onCategorySelected(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.categorySelected.emit(selectElement.value);
  }
}
