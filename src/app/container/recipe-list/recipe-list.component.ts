import { Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { ThemealdbGeneralService } from '../../services/themealdb-general.service';
import { Meal } from '../../common/meal';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-recipe-list',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css'
})
export class RecipeListComponent implements OnChanges {

  meals: Meal[] = [];
  @Input() selectedCategory: string = '';
  @ViewChild('slider', { static: false }) slider!: ElementRef;
  
  currentIndex: number = 0;

  constructor(private themealdbGeneralService: ThemealdbGeneralService) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedCategory'] && this.selectedCategory) {
      if(this.selectedCategory === 'random') {
        this.themealdbGeneralService.getRandomRecipe().subscribe(data => {
        this.meals = [...data];
      })
      }else{
        console.log(`Fetching recipes for category: ${this.selectedCategory}`);
        this.fetchRecipesByCategory();
      }
    }
  }

  ngAfterViewInit() {
    this.setupSlider();
  }
  private setupSlider() {
    const observer = new ResizeObserver(() => {
      this.updateSliderPosition();
    });
    observer.observe(this.slider.nativeElement);
  }
  fetchRecipesByCategory() {
    this.themealdbGeneralService.getMealsByCategoryName(this.selectedCategory).subscribe(data => {
      this.meals = [...data];
      this.currentIndex = 0; 
    });
    this.updateSliderPosition(); 
  }

  send(id: string) {
    console.log(`Meal with ID ${id} selected!`);
  }

scrollLeft() {
  if (this.currentIndex > 0) {
    this.currentIndex--;
    this.updateSliderPosition();
  }
}

scrollRight() {
  if (this.currentIndex < this.meals.length - 1) {
    this.currentIndex++;
    this.updateSliderPosition();
  }
}

  updateSliderPosition() {
    const offset = this.currentIndex * -100; 
    this.slider.nativeElement.style.transform = `translateX(${offset}%)`;
  }
}
