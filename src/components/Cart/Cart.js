import { useContext } from 'react';

import CartContext from '../store/cart-context';
import CartItem from './CartItem'
import Modal from '../UI/Modal';
import classes from './Cart.module.css';

const Cart = props => {
    const cartCtx = useContext(CartContext);

    const totalAmount = cartCtx.total.toFixed(2)

    const cartItemAddHandler = (item) => {
        cartCtx.addItem({...item,amount: 1});
    };

    const cartItemRemoveHandler = (id) => {
        cartCtx.removeItem(id)
    };

    const cartItems = (
        <ul className={classes['cart-items']}>
            {cartCtx.meals.map(item => {
                return <CartItem 
                    key = {item.id}
                    name = {item.name}
                    amount = {item.amount}
                    price = {item.price}
                    onAdd = {cartItemAddHandler.bind(null, item)}
                    onRemove = {cartItemRemoveHandler.bind(null, item.id)}
                />
            })} 
        </ul>);

    return (
        <Modal onClick={props.onCloseCart}>
            {cartItems}
            <div className={classes.total}>
                <span>Total amount</span>
                <span>{totalAmount}$</span>
            </div>
            <div className={classes.actions}>
                <button className={classes['button--alt']} onClick={props.onCloseCart}>Close</button>
                <button className={classes.button}>Order</button>
            </div>
        </Modal>
    )
};

export default Cart;