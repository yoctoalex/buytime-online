import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm/index';

@Entity()
export class UsZip {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 5, nullable: false })
  zip: string;

  @Column({ type: 'double', nullable: false })
  lat: number;

  @Column({ type: 'double', nullable: false })
  lon: number;
}
