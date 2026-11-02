import { test, expect } from '@playwright/test';
import { env } from '../../config/environment';
import { ApiClient } from '../../api/clients/ApiClient';

test.describe('Posts API smoke tests', () => {
  test('GET /posts/1 returns a valid post', async ({ request }) => {
    const api = new ApiClient(request);
    const response = await api.get(`${env.apiBaseURL}/posts/1`);

    expect(response.status()).toBe(200);
    const body: unknown = await response.json();
    expect(body).toMatchObject({
      userId: 1,
      id: 1
    });
    expect((body as { title?: unknown }).title).toEqual(expect.any(String));
  });
});
