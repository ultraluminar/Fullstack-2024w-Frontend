import { CreateQuestion } from './create-question';

describe('CreateQuestion', () => {
  it('should create an instance', () => {
    expect(new CreateQuestion("Wie schreibe ich eine Fullstack Webanwendung?", "Bitte helft mir das Modul ist so schwer!" )).toBeTruthy();
  });
});
