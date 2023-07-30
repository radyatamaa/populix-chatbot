// export const chatHistoryIndex = {
//     _index: 'chat_history',
//     _type: 'chat_historys'
// };

export class ChatHistoryIndex {
    index: 'chat_history';
    type: 'chat_historys';
  };

  
export class ChatHistory {
    messageId:number;
    dateTime:string;
    isFromBot:boolean;
    isFromCustomer:boolean;
    telegramId:string;
    messages:string;
}
  