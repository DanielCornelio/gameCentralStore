import { createContext, useState } from "react";

export const CartContext = createContext();

const CartProvider = ({children}) => {
    const [cart, setCart] = useState([])
        console.log("cart", cart)

     const addToCart = ({ id, titulo, portada_url, plataforma, genero, precio, }) => {
        const productoEcontradoIndex = cart.findIndex((p) => p.titulo === titulo);
        const producto = { id, titulo, portada_url, plataforma, genero, precio, count: 1 };
    
        if (productoEcontradoIndex >= 0) {
          cart[productoEcontradoIndex].count++;
          setCart([...cart]);
        } else {
          setCart([...cart, producto]);
        }
      };

      const incrementar = (id) => {
        const updatedCart = cart.map((game) => {
          if (game.id === id) {
            return { ...game, count: game.count + 1 };
          }
          return game;
        });
        setCart(updatedCart);
      };
    
      const disminuir = (id) => {
        const updatedCart = cart
          .map((game) => {
            if (game.id === id && game.count > 0) {
              return { ...game, count: game.count - 1 };
            }
            return game;
          })
          .filter((game) => game.count > 0);
        setCart(updatedCart);
      };

      const subtotal = cart.reduce((total, game) => {
        return total + game.precio * game.count;
      }, 0);

      const total = subtotal * 1.16

      const globalState = {
        addToCart,
        cart,
        incrementar,
        disminuir,
        total,
        subtotal
      }

      return <CartContext.Provider value={globalState}>{children}</CartContext.Provider>

}

export default CartProvider;