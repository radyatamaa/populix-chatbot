import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Card {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: "subtitle" , type: 'mediumtext'})
    subtitle: string;

    @Column({ length: 100, name: "card_type" })
    cardType: string;

    @Column({ length: 100, name: "image_url" })
    imageUrl: string;

    @Column({ name: "quick_replies" , type: 'text'})
    quickReplies: string;

    @Column({ name: "content_id"})
    contentId: number;

    @Column({ name: "sort" })
    sort: number;
}
  