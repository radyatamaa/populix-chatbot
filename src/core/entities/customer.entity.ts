import { FormBuilderSaveToCustomer } from "./card.entity";

export class Customer {
    id: number;
    telegramId: string;
    firstName: string;
    lastName: string;
    userName: string;
    locale: string;
    email: string;
    phoneNumber: string;
    createdAt: string;
    lastConversation: string;
    currentFormRealm: string;
}
  
export class CurrentFormRealm {
    card_id: number;
    completed_message: string;
    completed_redirect_content_id: number;
    save_to_customer: FormBuilderSaveToCustomer;
}