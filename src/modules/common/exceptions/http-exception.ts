export abstract class HTTPException extends Error {
  abstract getStatusCode(): number;
  abstract getBody(): Record<string, any>;
}
