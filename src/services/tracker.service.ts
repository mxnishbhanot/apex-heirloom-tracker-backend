import battlePassData from '../../public/data/battlepass.json';

interface TrackerInput {
  level: number;
  battlePass: {
    season: string;
    levelReached: number;
    bought: boolean;
  }[];
  purchasedPacks?: number;
}

export const calculatePacks = (input: TrackerInput) => {
  let totalPacks = 0;

  // Account Level Packs
  const level = input.level;
  if (level >= 1) totalPacks += Math.min(level, 20); // 1-20
  if (level > 20) totalPacks += Math.floor((Math.min(level, 300) - 20) / 2); // 21–300
  if (level > 300) totalPacks += Math.floor((Math.min(level, 500) - 300) / 5); // 301–500

  // Battle Pass Packs
  input.battlePass.forEach(({ season, levelReached, bought }) => {
    const bpSeason = battlePassData[season as keyof typeof battlePassData];
    if (bpSeason) {
      const free = bpSeason.free.filter((lvl: number) => lvl <= levelReached).length;
      const paid = bought ? bpSeason.paid.filter((lvl: number) => lvl <= levelReached).length : 0;
      totalPacks += free + paid;
    }
  });

  // Purchased Packs
  totalPacks += input.purchasedPacks || 0;

  return {
    totalPacks,
    remaining: Math.max(500 - totalPacks, 0),
    progressPercent: Math.min((totalPacks / 500) * 100, 100)
  };
};
