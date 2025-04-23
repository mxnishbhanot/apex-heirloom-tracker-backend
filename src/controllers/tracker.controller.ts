import { Request, Response, RequestHandler } from 'express';
import { TrackerInputSchema } from '../validators/tracker.validator';
import { calculatePacks } from '../services/tracker.service';

type TrackerInput = typeof TrackerInputSchema._type;

export const calculateTracker: RequestHandler = (
  req: Request<unknown, unknown, TrackerInput>,
  res: Response
) => {
  const result = TrackerInputSchema.safeParse(req.body);

  if (!result.success) {
    res.status(400).json({
      error: 'Invalid input',
      details: result.error.flatten(),
    });
    return;
  }

  const response = calculatePacks(result.data);
  res.status(200).json(response);
};