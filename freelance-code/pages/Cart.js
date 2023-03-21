
// // //This goes in component that displays the cart 
// //   <ul>
// //   {cart.map((product) => (
// //     <li key={product.id}>
// //       {product.name} - ${product.price}
// //       <button onClick={() => handleRemoveFromCart(product)}>Remove from Cart</button>
// //     </li>
// //   ))}
// // </ul>


// function ProductList({ products, onAddToCart }) {
//     return (
//       <div>
//         <h2>Products</h2>
//         <ul>
//           {products.map((product) => (
//             <li key={product.id}>
//               {product.name} - ${product.price}
//               <button onClick={() => onAddToCart(product)}>Add to Cart</button>
//             </li>
//           ))}
//         </ul>
//       </div>
//     );
//   }
  

// // //Display no. of items in cart
// //   <div>Cart ({cart.length} items)</div>

import { useState } from 'react';

function Product({ name, price }) {
  const [cartItems, setCartItems] = useState([]);

  const handleAddToCart = (item) => {
    setCartItems([...cartItems, item]);
  }

    const handleRemoveFromCart = (product) => {
    const updatedCart = cart.filter((item) => item.id !== product.id);
    setCart(updatedCart);
  };

//   const price = [
//     { value: "1 hour @ 25£", label: "1 hour @ 25£" },
//     { value: "1 hour @ 45£", label: "1 hour @ 45£" },
//   ];

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
