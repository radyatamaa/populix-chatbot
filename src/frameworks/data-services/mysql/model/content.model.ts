import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Content {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    keywords: string;

    @Column()
    card_ids: string;
}
  