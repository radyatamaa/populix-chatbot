import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CardType {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100, name: "name" })
    name: string;

    @Column({ length: 50, name: "key" })
    key: string;
}
  