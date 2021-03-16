export abstract class BaseHTTPException extends Error {
  abstract getStatusCode(): number;
  abstract getBody(): Record<string, any>;
}
