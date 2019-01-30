import { User } from '@/models';

const findUserByTelegramId = async (telegramId: number) => User.findOne({ telegramId });

const createUser = async (telegramId: number) => User.create({ telegramId });

export default {
  findUserByTelegramId,
  createUser
};
