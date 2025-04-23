import { calculatePacks } from '../src/services/tracker.service';

describe('calculatePacks()', () => {
  it('calculates packs correctly for level and BP', () => {
    const input = {
      level: 250,
      battlePass: [
        {
          season: 'season3',
          levelReached: 30,
          bought: true
        },
        {
          season: 'season4',
          levelReached: 60,
          bought: false
        }
      ],
      purchasedPacks: 10
    };

    const result = calculatePacks(input);

    expect(result.totalPacks).toBeGreaterThan(0);
    expect(result.remaining).toBeLessThanOrEqual(500);
    expect(result.progressPercent).toBeLessThanOrEqual(100);
  });
});
