import { Request, Response } from 'express';
import MenuItem from '../models/MenuItem';
import { StatusCodes } from 'http-status-codes';
import MESSAGE from '../constants/message';

export const getMenu = async (req: Request, res: Response): Promise<void> => {
  const menu = await MenuItem.find();
  res.status(StatusCodes.OK).json({
    message: MESSAGE.get.succ,
    result: menu,
  });
};
export const createMenu = async (
  req: Request,
  res: Response
): Promise<void> => {
  const menuItem = new MenuItem(req.body);
  await menuItem.save();
  res.status(StatusCodes.CREATED).json({
    message: MESSAGE.post.succ,
    result: menuItem,
  });
};
