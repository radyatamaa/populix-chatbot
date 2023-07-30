export class TelegramMessage {
    chat_id: string;
    text: string;
    parse_mode: string;
    reply_markup:ReplyMarkup;
}

export class ReplyMarkup {
    inline_keyboard: any[]
}

export class InlineKeyboardQR {
    text: string;
    callback_data: string;
}

export class PayloadCallbackData {
    redirect_content_id:number;
    value:string;
}