import { useState } from 'react';

function addToCart(itemId, quantity) {
  fetch('../api/cart/addcart', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`,
    },
    body: JSON.stringify({ itemId, quantity }),
  })
    .then(response => {
      if (response.ok) {
        // Handle success
      } else {
        // Handle error
      }
    })
    .catch(error => {
      // Handle network error
    });
}

function getCart() {
  return fetch('../api/cart/getcart', {
    headers: {
      'Authorization': `Bearer ${authToken}`,
    },
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Failed to retrieve cart items');
      }
    });
}

function Product({ name, price }) {
  const [cartItems, setCartItems] = useState([]);

  const handleAddToCart = (item) => {
    setCartItems([...cartItems, item]);
  }

    const handleRemoveFromCart = (product) => {
    const updatedCart = cart.filter((item) => item.id !== product.id);
    setCart(updatedCart);
  };


  function Cart({ items }) {
    return (
      <div>
        <h2>Cart</h2>
        <ul>
          {items.map((item, index) => (
            <li key={index}>{item.name} - ${item.price}</li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div>
      <h2>{name}</h2>
      hello
      <p>Price: ${price}</p>
      <button onClick={() => handleAddToCart({name, price})}>Add to Cart</button>
      <button onClick={() => handleRemoveFromCart(product)}>Remove from Cart</button>
      <Cart items={cartItems} />
    </div>
  );
}

export default Product;
