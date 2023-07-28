import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CardType {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    key: string;
}
  