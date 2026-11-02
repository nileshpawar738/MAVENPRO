import type { Locator, Page } from '@playwright/test';
import { APP } from '../constants/appConstants';

export class InventoryPage {
  private readonly inventoryItems: Locator;
  private readonly cartLink: Locator;
  private readonly cartBadge: Locator;
  private readonly sortDropdown: Locator;

  constructor(private readonly page: Page) {
    this.inventoryItems = page.locator('.inventory_item');
    this.cartLink = page.locator(APP.selectors.shoppingCartLink).nth(0);
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.sortDropdown = page.locator(APP.selectors.productSortContainer);
  }

  async addProductToCart(productName: string): Promise<void> {
    const product = this.inventoryItems.filter({ hasText: productName });
    await product.getByRole('button', { name: 'Add to cart' }).click();
  }

  async getCartCount(): Promise<number> {
    if (await this.cartBadge.count() === 0) return 0;
    return Number(await this.cartBadge.innerText());
  }

  async openCart(): Promise<void> {
    await this.cartLink.click();
  }

  async sortByPriceLowToHigh(): Promise<void> {
    await this.sortDropdown.selectOption('lohi');
  }

  async getProductPrices(): Promise<number[]> {
    const prices = await this.inventoryItems.locator('.inventory_item_price').allTextContents();
    return prices.map((price) => Number(price.replace('$', '').trim()));
  }

  async getProductNames(): Promise<string[]> {
    return this.inventoryItems.locator('.inventory_item_name').allTextContents();
  }
}
