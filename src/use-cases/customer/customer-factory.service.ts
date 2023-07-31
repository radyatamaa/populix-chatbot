import { Injectable } from '@nestjs/common';
import { ChatHistory } from 'src/core';

@Injectable()
export class CustomerFactoryService {
    toChatHistory(qresult: any) {
        const chatHistory = new ChatHistory();
        chatHistory.id = qresult.id;
        chatHistory.dateTime = qresult.dateTime;
        chatHistory.isFromBot = qresult.isFromBot;
        chatHistory.telegramId = qresult.telegramId;
        chatHistory.messages = qresult.messages;
        return chatHistory;
      }
}
