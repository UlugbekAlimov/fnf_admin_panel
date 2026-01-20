import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Button } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { TextareaModule } from 'primeng/textarea';

type AnswerOption = {
  id: number;
  text: string;
  correct: boolean;
};

@Component({
  selector: 'education-question-create',
  standalone: true,
  imports: [CommonModule, FormsModule, Dialog, Button, TextareaModule],
  templateUrl: './question-create.html',
})
export class QuestionCreate {
  @Input() visible = false;
  @Output() visibleChange = new EventEmitter<boolean>();

  questionText = 'What is the primary function of the mitochondria in a cell?';
  explanation = '';
  allowMultiple = false;
  answers: AnswerOption[] = [
    { id: 1, text: 'Power generation (ATP production)', correct: true },
    { id: 2, text: 'Protein synthesis', correct: false },
    { id: 3, text: 'Cell division control', correct: false },
    { id: 4, text: 'Photosynthesis', correct: false },
  ];

  close() {
    this.visible = false;
    this.visibleChange.emit(false);
  }

  addOption() {
    const nextId = this.answers.length ? Math.max(...this.answers.map((a) => a.id)) + 1 : 1;
    this.answers = [
      ...this.answers,
      { id: nextId, text: 'New option', correct: false },
    ];
  }

  removeOption(option: AnswerOption) {
    this.answers = this.answers.filter((item) => item.id !== option.id);
  }

  markCorrect(option: AnswerOption) {
    if (this.allowMultiple) {
      option.correct = !option.correct;
      return;
    }

    this.answers = this.answers.map((item) => ({
      ...item,
      correct: item.id === option.id,
    }));
  }

  toggleMultiple() {
    this.allowMultiple = !this.allowMultiple;
    if (!this.allowMultiple) {
      const firstCorrect = this.answers.find((item) => item.correct);
      this.answers = this.answers.map((item) => ({
        ...item,
        correct: firstCorrect ? item.id === firstCorrect.id : false,
      }));
    }
  }
}
