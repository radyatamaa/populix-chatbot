import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Content {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100, name: "title" })
    title: string;

    @Column({ length: 100, name: "keywords" })
    keywords: string;
}
  