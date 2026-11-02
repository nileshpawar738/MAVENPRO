export const APP = {
  name: 'SauceDemo',
  routes: {
    login: '/',
    inventory: '/inventory.html',
    cart: '/cart.html',
    checkoutStepOne: '/checkout-step-one.html'
  },
  selectors: {
    username: '#user-name',
    password: '#password',
    loginButton: '#login-button',
    inventoryContainer: '#inventory_container',
    shoppingCartLink: '.shopping_cart_link',
    shoppingCartBadge: '.shopping_cart_badge',
    addToCartBackpack: '#add-to-cart-sauce-labs-backpack',//add-to-cart-sauce-labs-backpack
    removeBackpack: 'remove-sauce-labs-backpack',
    productSortContainer: '.product_sort_container'//productSortContainer
  },
  products: {
    backpack: 'Sauce Labs Backpack',
    bikeLight: 'Sauce Labs Bike Light'
  },
  messages: {
    invalidLogin: 'Epic sadface: Username and password do not match any user in this service',
    lockedOut: 'Epic sadface: Sorry, this user has been locked out.'
  }
} as const;
