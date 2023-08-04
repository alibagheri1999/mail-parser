import {
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('Logger', {})
class Logger extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: string;

  @Column({
    nullable: false,
  })
  public level: string;

  @Column({
    nullable: false,
  })
  public entries: string;

  @Column({
    nullable: false,
  })
  public name: string;

  @Column({
    nullable: false,
  })
  public message: string;

  @Column({
    nullable: false,
  })
  public context_name: string;

  @Column({
    nullable: true,
  })
  public trace: string;

  @CreateDateColumn()
  public create_date: Date;

  @UpdateDateColumn()
  public last_modified_date: string;
}

export default Logger;
/*@PrimaryGeneratedColumn()
public id: string;

@Column({
  nullable: false,
})
public name: string;

@Column()
public phone_no: string;

@Column()
public email: string;

@CreateDateColumn()
public create_date: Date;

@UpdateDateColumn()
public last_modified_date: string;*/
