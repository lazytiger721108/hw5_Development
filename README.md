# Development

### Link to Deployed Website

Link: `https://lazytiger721108.github.io/hw5/`

### Goal and Value of the Application

The website collects *Amazon book data*, and show some key properties, including title, price, author, reviews of books
to
users. Users can use this website to find books they like.

### Usability Principles Considered

- Consistency: Use Bootstrap to make the website look consistent.
- Efficiency: Put sidebar + main book data list + cart in one page, so users can see all the information at one glance.

### Organization of Components

- left: sidebar
    - sort by reviews count (default ascendingly)
    - filter by author (dropdown list showing all authors)
    - filter by seller (dropdown list showing all sellers)
- middle: vertical list of books item cards
    - each book item card contains:
        - title
        - price
        - author
        - reviews count
        - "add to cart"/"remove from cart" button
- right: shopping cart
    - total price of items in cart
    - list of items in cart

### How Data is Passed Down Through Components

- Data is passed down from main component (app.js) to child components (sideBar + itemCard) through props.
  props.
    - Main component passed book data information and add/remove item functions to ItemCard component, then ItemCard can
      correctly render book data.
    - Main component passed sort/filter functions to SideBar component, then SideBar can manipulate book data shown on
      the homepage correctly.

### How the User Triggers State Changes

- 'Add to cart' button in ItemCard component triggers state changes in Main component. When clicking this button, the
  book item will be added to the shopping cart. At the same time, the total price of items in cart will change
  correspondingly. Same to 'remove from cart' button.
- filter & sort functions in SideBar component trigger state changes in Main component. When clicking the filter or sort
  button, the book data shown on the homepage will change correspondingly.

