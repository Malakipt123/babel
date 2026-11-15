import { describe, expect, it } from 'vitest';
import { normalizeSelection } from './text';

describe('normalizeSelection', () => {
  it('trims and collapses spaces', () => {
    expect(normalizeSelection('  Hallo!   Wann kommt\u00a0meine Bestellung?  ')).toBe(
      'Hallo! Wann kommt meine Bestellung?',
    );
  });

  it('keeps paragraph breaks but collapses extra blank lines', () => {
    expect(normalizeSelection('Bonjour \n\n\n\n Merci')).toBe('Bonjour\n\nMerci');
  });

  it('caps the length', () => {
    expect(normalizeSelection('a'.repeat(50), 10)).toBe('a'.repeat(10));
  });

  it('returns an empty string for whitespace only', () => {
    expect(normalizeSelection(' \n\t ')).toBe('');
  });
});
