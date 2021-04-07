import {Transaction} from './transaction';

describe('Expense', () => {
  it('should create an instance', () => {
    expect(new Transaction('17b6361e-7e41-45ee-aaf0-e818b8268906',
      120,
      'Somebody',
      'DEVELOPMENT',
      null,
      null,
      null
    )).toBeTruthy();
  });
});
