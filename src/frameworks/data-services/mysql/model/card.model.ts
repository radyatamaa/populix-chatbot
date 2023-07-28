import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Card {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    cardType: string;

    @Column()
    imageUrl: string;

    @Column()
    quickReplies: string;
}
  