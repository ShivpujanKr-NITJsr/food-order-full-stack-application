import { get } from 'mongoose';
import { order } from './order/order';
import { menu } from './menu/menu';

export const api = {
  menu: {
    getMenu: menu.getMenu,
    createMenu: menu.createMenu,
  },
  order: {
    getOrder: order.getOrder,

    createOrder: order.createOrder,
  },
};
