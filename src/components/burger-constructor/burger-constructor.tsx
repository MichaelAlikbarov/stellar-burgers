import { FC, useMemo } from 'react';
import { TConstructorIngredient, TOrder } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import {
  burgerConstructorSelector,
  resetConstructor,
  TBurgerConstructor
} from '../../services/burgerConstructor/slice';
import { useNavigate } from 'react-router-dom';
import { getUser } from '../../services/user/slice';
import {
  isOrderStatus,
  orderData,
  resetOrder
} from '../../services/order/slice';
import { newOrder } from '../../services/order/action';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector(getUser);
  const constructorItems = useSelector(burgerConstructorSelector);
  const orderRequest = useSelector(isOrderStatus);
  const orderModalData = useSelector(orderData);

  const onOrderClick = () => {
    if (!user) {
      navigate('/login');
    }
    if (!constructorItems.bun || orderRequest) return;
    const { bun, ingredients } = constructorItems;
    const orderData: string[] = [
      bun._id,
      ...ingredients.map((item) => item._id),
      bun._id
    ];
    return dispatch(newOrder(orderData));
  };
  const closeOrderModal = () => {
    dispatch(resetOrder());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
