import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Customer {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    telegramId: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    userName: string;

    @Column()
    locale: string;

    @Column()
    email: string;

    @Column()
    phoneNumber: string;
}
  