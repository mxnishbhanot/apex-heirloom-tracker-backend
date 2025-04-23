import { z } from 'zod';

export const TrackerInputSchema = z.object({
  level: z.number().min(1).max(500),
  battlePass: z.array(
    z.object({
      season: z.string(),
      levelReached: z.number().min(1),
      bought: z.boolean()
    })
  ),
  purchasedPacks: z.number().min(0).optional()
});

export type TrackerInput = z.infer<typeof TrackerInputSchema>;
