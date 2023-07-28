import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Customer {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50, name: "telegram_id" })
    telegramId: string;

    @Column({ length: 100, name: "first_name" })
    firstName: string;

    @Column({ length: 100, name: "last_name" })
    lastName: string;

    @Column({ length: 100, name: "username" })
    userName: string;

    @Column({ length: 5, name: "locale" })
    locale: string;

    @Column({ length: 50, name: "email" })
    email: string;

    @Column({ length: 20, name: "phone_number" })
    phoneNumber: string;

    @Column({ name: "created_at" , type:'datetime' })
    createdAt: string;

    @Column({ name: "last_conversation", type:'datetime' })
    lastConversation: string;
}
  