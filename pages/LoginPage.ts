import type { Locator, Page } from '@playwright/test';
import { APP } from '../constants/appConstants';

export class LoginPage {
  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;
  private readonly errorMessage: Locator;

  constructor(private readonly page: Page) {
  this.usernameInput = page.locator(APP.selectors.username);
    this.passwordInput = page.locator(APP.selectors.password);
    this.loginButton = page.locator(APP.selectors.loginButton);
    this.errorMessage = page.locator('[data-test="error"]');
  }

  async goto(): Promise<void> {
    await this.page.goto(APP.routes.login);
  }

  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async getErrorMessage(): Promise<string> {
    return (await this.errorMessage.textContent())?.trim() ?? '';
  }
}
