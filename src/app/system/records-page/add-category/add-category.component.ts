import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CategoryService } from '../../shared/services/category.service';
import { Category } from '../../shared/models/category.model';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {

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
    this.categoryService.addCategory(newCategory)
      .subscribe((category: Category) => {
        form.reset();
        form.form.patchValue({ capacity: 1 });
        this.newCategoryAdd.emit(category);
      });
  }

}
