import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { MinLength, MaxLength, Matches } from 'class-validator';
export const regex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/gm;
@Entity()
export class UrlEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  @Matches(regex)
  url: string;

  @Column({length: 6})
  @MinLength(6)
  @MaxLength(6)
  shortId: string;

  @Column({default: false})
  selfGenerated: boolean;
}