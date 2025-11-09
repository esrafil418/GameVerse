# GameVerse

![GameVerse Logo](assets/icons/GameVerse-logo-transparent.png)
[![wakatime](https://wakatime.com/badge/user/396dff75-025e-4679-bd2e-c74ec170e549/project/5ed43a4f-e5f2-4c97-a8bf-1c8f3f99dea6.svg)](https://wakatime.com/badge/user/396dff75-025e-4679-bd2e-c74ec170e549/project/5ed43a4f-e5f2-4c97-a8bf-1c8f3f99dea6)

https://gameverse-official.netlify.app/

A simple and engaging video game store! Focused on a dynamic shopping cart, search, and item management. Built with pure HTML, CSS, and JavaScript (no frameworks).

## Features

- **Game Display**: Responsive cards with images, prices (with discounts), and platforms.
- **Shopping Cart**:
  - Add/remove items with quantity management (prevents duplicates).
  - Total price calculation (supports Persian digits).
  - Persistent storage with localStorage.
- **Search**: Quick filter for games by title.
- **RTL Design**: Fully Persian, with responsive grid (1 to 3 columns).
- **Accessibility**: ARIA labels and sr-only for screen readers.

## Installation and Setup

1. **Download the Project**:

- git clone <repo-url>  # Or download the files directly
cd GameVerse


2. **Required Files**:
- Ensure the `assets` folder (images and icons) exists.
- Download the Vazir font from [here](https://rastikerdar.github.io/vazir-font/) and link it in CSS (or use a CDN).


3. **Run**:
- Open `index.html` in a browser (e.g., Chrome/Firefox).
- No server required – everything is client-side.


## How to Use
- **Add to Cart**: Click "Add to Cart" button – quantity updates and saves to localStorage.
- **Open Cart**: Click the cart icon in the header – view total price and remove items.
- **Search**: Type in the search box and hit Enter – cards filter accordingly.
- **Test**: Check the browser console (F12) for logs. View localStorage in the Application tab.


## License

free to use, modify, and distribute.

---

Built with ❤️ for JS learning. If you have questions or want help, open an issue! 🚀
