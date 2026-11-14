import { describe, expect, test } from 'bun:test';
import { offer } from './content';

describe('Course offer', () => {
  test('The payment amount is R$ 297', () => expect(offer.price).toBe(297));
  test('The discount is R$ 200 from R$ 497', () => expect(offer.original - offer.price).toBe(200));
  test('The installment offer is 12 payments of R$ 30,72', () => {
    expect(offer.installments).toBe(12);
    expect(offer.installment).toBe('30,72');
  });
  test('The refund period is seven days', () => expect(offer.guaranteeDays).toBe(7));
});