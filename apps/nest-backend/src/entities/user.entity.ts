import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'user_entity' })
export class UserEntity {
  @PrimaryGeneratedColumn('increment')
  id!: string;

  @Column({ name: 'user_name', type: 'varchar', length: 256 })
  userName!: string;

  @Column({ type: 'varchar', length: 256, unique: true, nullable: false })
  email!: string;
}
