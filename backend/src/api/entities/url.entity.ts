import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { MinLength, MaxLength } from 'class-validator';

@Entity()
export class UrlEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  url: string;

  @Column({length: 6})
  @MinLength(6)
  @MaxLength(6)
  shortId: string;

  @Column({default: false})
  selfGenerated: boolean;
}