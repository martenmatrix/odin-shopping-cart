# Weather App

This React application simulates an online store, where you can purchase graphic cards. The project makes heavily use of React Router and always saves the exact state of the page in the URL. The current  viewed image of the image slideshow for the product, the cart, the filters applied, the current route; everything is saved trough React Router and a `useCustomSearchParams()` hook, which allows removing a single search parameter by its key and its value even if there are other search parameters with the same key.

As an example, having the Nvidia filter in the Chipset section applied, being on a product page, looking at the third image of the image slideshow and having added the product two times to the cart would generate this link:
`https://martenmatrix.github.io/shopping-cart/shop/product/7?chipset=Nvidia&incart=7x2#3`
- `shop/product/7` states that we are currently on the product page for the product with the ID '7'
- the hash `#3` means that the third image from the image slider is currently being displayed
- The search parameters `?chipset=Nvidia&incart=7x2` state two different things
	1. `chipset=Nvidia` means that in the filter Nvidia was applied from the category Chipset
	2. `incart=7x2` means that 2 items with the ID of '7' are currently in cart
	
## Table of Contents
- [Deployed links](#globe_with_meridians-deployed-links)
- [Usage](#grey_exclamation-usage)
- [Features](#sparkles-features)
- [Installation](#wrench-installation)
- [Technology stack](#blue_book-technology-stack)
- [License](#scroll-license)

## :globe_with_meridians: Deployed links
> :warning: This page is not yet optimized for mobile devices.

> :warning: GitHub Pages doesn’t support routers that use the HTML5 `pushState` history API under the hood (for example, React Router using `browserHistory`). This is because when there is a fresh page load for a URL like `https://martenmatrix.github.io/shopping-cart/shop/product/1`, where `shop/product/1` is a frontend route, the GitHub Pages server returns 404 because it knows nothing of `shop/product/1`. 
> This means that the page will work fine, however you are unable to navigate the page trough the URL.

The application is hosted at the following address:

- https://martenmatrix.github.io/shopping-cart/

## :grey_exclamation: Usage
1. Go to the shop page by pressing the button with the text 'BUY NOW'.
2. If you want, you can apply filters for the Chipset and Series on the left side of the page.
3. Click a product.
4. You can slide through the images, specify a quantity and add the product to the cart.
5. Open the cart by clicking the round circle with the shopping cart on it in the bottom right corner.
6. If something does not work as expected, please [create an issue](https://github.com/martenmatrix/shopping-cart/issues/new).

## :sparkles: Features
- saves the exact state of the page in the URL
- able to apply filters to filter the products
- able to add the products with a specified quantity to the cart
- able to change the quantity or remove the product completely from the cart

##  :wrench: Installation

If you want to run the application on your local pc or just want to contribute, do the following steps:

1. Clone the repository.
	`git clone https://github.com/martenmatrix/shopping-cart`

2. Install the dependencies.
	`npm install`

3. If you want to run the website on your localhost type: 
	`npm run start`

## :blue_book: Technology Stack
- **Create React App** v5.0.0
- **React Router** v.6.2.1

## :scroll: License
[MIT](https://github.com/martenmatrix/shopping-cart/blob/main/LICENSE)