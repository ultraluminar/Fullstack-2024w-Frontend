import { Answer } from './answer';

describe('Answer', () => {
  it('should create an instance', () => {
    expect(new Answer(12345, 12345, "Eine unglaublich hilfreiche und gut geschriebene Antwort", new Date, new Date, 12345, 420)).toBeTruthy();
  });
});
