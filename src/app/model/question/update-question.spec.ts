import { UpdateQuestion } from './update-question';

describe('UpdateQuestion', () => {
  it('should create an instance', () => {
    expect(new UpdateQuestion("Wie schreibe ich eine Fullstack Webanwendung, die mir eine 1,0 bringt?", "Bitteh helft mir die Deadline ist morgen!")).toBeTruthy();
  });
});
