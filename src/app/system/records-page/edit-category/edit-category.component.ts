import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Category } from '../../shared/models/category.model';
import { CategoryService } from '../../shared/services/category.service';
import { Message } from 'src/app/shared/models/message.model';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit {

  @Input() categories: Category[] = [];
  @Output() oldCategoryEdit = new EventEmitter<Category>();

  currentCategoryId = 1;
  currentCategory: Category;
  message: Message;

  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    this.message = new Message('success', '');
    this.onCategoryChange();
  }

  onSubmit(form: NgForm) {
    let {
      capacity, name
    } = form.value;

    if (capacity < 1) { capacity *= -1; }

    const editedCategory = new Category(name, capacity, +this.currentCategoryId);
    this.categoryService.updateCategory(editedCategory)
      .subscribe((category: Category) => {
        this.oldCategoryEdit.emit(category);
        this.message.text = 'Удачно отредактировали';
        setTimeout(() => {
          this.message.text = '';
        }, 5000);
        console.log(category);
      });
  }

  onCategoryChange() {
    console.log(this.currentCategoryId);
    this.currentCategory = this.categories.find((c) => c.id === +this.currentCategoryId);
  }

}
