import type { IncomingMessage, ServerResponse } from 'node:http';

interface ForwardApiRequestOptions {
  apiBaseUrl: string;
  apiKey: string;
  req: IncomingMessage;
  res: ServerResponse;
}

export async function forwardApiRequest({
  apiBaseUrl,
  apiKey,
  req,
  res,
}: ForwardApiRequestOptions): Promise<void> {
  const targetUrl = new URL(getUpstreamPath(req.url), apiBaseUrl);
  const headers = new Headers();

  for (const [key, value] of Object.entries(req.headers)) {
    if (!value || key.toLowerCase() === 'host') {
      continue;
    }

    headers.set(key, Array.isArray(value) ? value.join(',') : value);
  }

  if (apiKey) {
    headers.set('x-api-key', apiKey);
  }

  try {
    const upstreamResponse = await fetch(targetUrl, {
      method: req.method,
      headers,
      body: hasRequestBody(req.method) ? req : undefined,
      duplex: hasRequestBody(req.method) ? 'half' : undefined,
    } as RequestInit & { duplex?: 'half' });

    res.statusCode = upstreamResponse.status;
    upstreamResponse.headers.forEach((value, key) => {
      res.setHeader(key, value);
    });

    const body = Buffer.from(await upstreamResponse.arrayBuffer());
    res.end(body);
  } catch {
    res.statusCode = 502;
    res.setHeader('content-type', 'application/json');
    res.end(JSON.stringify({ message: 'API gateway request failed' }));
  }
}

function hasRequestBody(method: string | undefined): boolean {
  return method !== undefined && !['GET', 'HEAD'].includes(method);
}

function getUpstreamPath(url: string | undefined): string {
  const requestUrl = url ?? '/';

  if (requestUrl === '/api') {
    return '/';
  }

  return requestUrl.startsWith('/api/')
    ? requestUrl.slice('/api'.length)
    : requestUrl;
}
