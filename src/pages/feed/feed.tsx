import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { ordersSelector } from '../../services/feed/slice';
import { getFeeds } from '../../services/feed/action';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch = useDispatch();

  const handleGetFeeds = useCallback(() => {
    dispatch(getFeeds());
  }, []);

  useEffect(() => {
    dispatch(getFeeds());
  }, []);

  const orders: TOrder[] = useSelector(ordersSelector);

  if (!orders.length) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
