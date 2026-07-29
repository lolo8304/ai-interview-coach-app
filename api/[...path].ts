import type { IncomingMessage, ServerResponse } from 'node:http';
import { forwardApiRequest } from '../src/server/api-client';

export default function handler(
  req: IncomingMessage,
  res: ServerResponse,
): void {
  void forwardApiRequest({
    apiBaseUrl: process.env.API_BASE_URL ?? '',
    apiKey: process.env.API_KEY ?? '',
    req,
    res,
  });
}
