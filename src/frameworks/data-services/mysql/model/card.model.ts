import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Card {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100, name: "title" })
    title: string;

    @Column({ length: 255, name: "description" })
    description: string;

    @Column({ length: 100, name: "card_type" })
    cardType: string;

    @Column({ length: 100, name: "image_url" })
    imageUrl: string;

    @Column({ name: "quick_replies" , type: 'text'})
    quickReplies: string;
}
  