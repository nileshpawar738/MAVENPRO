import type { APIRequestContext, APIResponse } from '@playwright/test';

export class ApiClient {
  constructor(private readonly request: APIRequestContext) {}

  async get(path: string): Promise<APIResponse> {
    return this.request.get(path);
  }

  async post(path: string, data: unknown): Promise<APIResponse> {
    return this.request.post(path, { data });
  }
}
