import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CategoryService } from '../../shared/services/category.service';
import { Category } from '../../shared/models/category.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit, OnDestroy {

  sub1: Subscription;

  @Output() newCategoryAdd = new EventEmitter<Category>();

  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    let {
      capacity,
      name
    } = form.value;

    if (capacity < 0) {
      capacity *= -1;
    }

    const newCategory = new Category(name, capacity);
    this.sub1 = this.categoryService.addCategory(newCategory)
      .subscribe((category: Category) => {
        form.reset();
        form.form.patchValue({ capacity: 1 });
        this.newCategoryAdd.emit(category);
      });
  }

  ngOnDestroy() {
    if (this.sub1) { this.sub1.unsubscribe(); }
  }
}
