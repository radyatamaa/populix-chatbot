export class Card {
    id: number;
    subtitle: string;
    cardType: string;
    imageUrl: string;
    quickReplies: string;
    contentId: number;
    sort: number;
}
  
export class FormBuilder {
    completed_message: string;
    completed_redirect_content_id: number;
    save_to_customer:FormBuilderSaveToCustomer[];
}

export class FormBuilderSaveToCustomer {
    field_name: string;
    message: string;
    error_message: string;
}

export class Options {
    answerFormBuilder: string;
    textPhase: string;
    valueButton: string;
}

export class QuickReply {
    quick_replies:QuickReplies[]
}

export class QuickReplies {
    type: string;
    label: string;
    value: string;
    redirect_content_id:number;
}
