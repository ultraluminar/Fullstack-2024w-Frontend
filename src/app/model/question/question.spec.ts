import { Question } from './question';

describe('Question', () => {
  it('should create an instance', () => {
    expect(new Question(12345, "Wie schreibe ich eine Fullstack Webanwendung?", "Bitte helft mir das Modul ist so schwer!", new Date, new Date, 12345, -15)).toBeTruthy();
  });
});
