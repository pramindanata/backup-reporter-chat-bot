export interface TelegramServiceContract {
  sendMessage(chatId: number | string, message: string): Promise<void>;
}
