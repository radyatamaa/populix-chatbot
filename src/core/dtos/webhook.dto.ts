export class RequestWebhookDto {
    update_id: number;
    message: Message;
}

export class Message {
    message_id: number;
    from: MessageFrom;
    chat: MessageChat;
    date: number;
    text: string;
}

export class MessageFrom {
    id: number;
    is_bot: boolean;
    first_name: string;
    last_name: string;
    username: string;
    language_code: string;
}

export class MessageChat {
    id: number;
    first_name: string;
    last_name: string;
    username: string;
    type: string;
}

