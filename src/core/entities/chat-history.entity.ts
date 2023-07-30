export class ChatHistory {
    id:string;
    dateTime:string;
    isFromBot:boolean;
    telegramId:string;
    messages:string;
}

export class ChatHistoryMessages {
    text: string;
    quickReplies: string;
}
  