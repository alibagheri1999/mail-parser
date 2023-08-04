import {
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('User', {})
class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: string;

  @Column({
    nullable: false,
  })
  public name: string;

  @Column({
    nullable: true,
  })
  public phone_no: string;

  @Column({
    nullable: true,
  })
  public email: string;

  @CreateDateColumn()
  public create_date: Date;

  @UpdateDateColumn()
  public last_modified_date: string;
}
export default User;
