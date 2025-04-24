import battlePassData from '../../public/data/battlepass.json';
import funnyMessages from '../../public/data/funnyMessages.json';

interface TrackerInput {
  level: number;
  battlePass: {
    season: string;
    levelReached: number;
    bought: boolean;
  }[];
  purchasedPacks?: number;
}

const getFunnyMessage = (progressPercent: number): string => {
  if (progressPercent >= 100) return pickRandom(funnyMessages.maxed);
  if (progressPercent >= 75) return pickRandom(funnyMessages.high);
  if (progressPercent >= 50) return pickRandom(funnyMessages.medium);
  return pickRandom(funnyMessages.low);
};

const pickRandom = (arr: string[]): string => {
  return arr[Math.floor(Math.random() * arr.length)];
};

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

  const remaining = Math.max(500 - totalPacks, 0);
  const progressPercent = Math.min((totalPacks / 500) * 100, 100);
  const message = getFunnyMessage(progressPercent);

  return {
    totalPacks,
    remaining,
    progressPercent,
    message
  };
};
