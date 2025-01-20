import { Component } from '@angular/core';
import { QuestionService, SortEnum } from '../service/question.service';
import { QuestionArray } from '../model/question/question-array';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { QuestionComponent } from '../question/question.component';

@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, QuestionComponent],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.css'
})
export class SearchPageComponent {
  title = 'Suche';

  private questionService: QuestionService;

  questions: QuestionArray | null = null;
  searchQuery: string = '';
  sort: SortEnum = SortEnum.NEWEST;
  sortEnum = SortEnum;

  constructor(questionService: QuestionService) {
    this.questionService = questionService;
  }

  public submitSearch(): void {
    this.questionService.searchQuestions(this.searchQuery, this.sort.toString()).subscribe((questions) => {
      this.questions = questions;
    });
  }
}
