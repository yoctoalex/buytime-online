import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm/index';

@Entity()
export class StoreLocation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100, nullable: false })
  title: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  address: string;

  @Column({ type: 'double', nullable: false })
  lat: number;

  @Column({ type: 'double', nullable: false })
  lon: number;
}
