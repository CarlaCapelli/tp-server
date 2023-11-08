import { Role } from 'src/common/enum/rol.enum';
import {
  Column,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: false })
  name: string;

  @Column({ unique: true, nullable: false })
  username: string;

  @Column({ nullable: false, select: false })
  password: string;

  @Column({ type: 'enum', default: Role.USER, enum: Role })
  role: Role;

  @DeleteDateColumn()
  deletedAt: Date;

  /// METODOS

  public getId(): number {
    return this.id;
  };

  public getPassword(): string{
    return this.password
  }

  public changeName(newName){
    this.name = newName
    return true
  }

  public changeRole(newRole:Role){
    this.role = newRole
    return true
  }

  public changeUsername(newUsername){
    this.username= newUsername
    return true
  }

  public changePassword(newPassword){
    this.password = newPassword
    return true
  }


}
