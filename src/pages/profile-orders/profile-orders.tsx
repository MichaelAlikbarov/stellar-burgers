import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { getOrders } from '../../services/order/action';
import { userOrders } from '../../services/order/slice';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrders());
  }, []);
  /** TODO: взять переменную из стора */
  const orders: TOrder[] = useSelector(userOrders);

  return <ProfileOrdersUI orders={orders} />;
};
