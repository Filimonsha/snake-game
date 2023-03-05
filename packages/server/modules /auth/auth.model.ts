import bcrypt from 'bcrypt';
import { validate } from 'class-validator';
import { IsEmail, Matches } from 'class-validator';
import type { TUserFull } from '../../types/user';
import { Pattern, Message } from '../../constants/validation';
import { AllowNull, AutoIncrement, BeforeSave, Column, 
         DataType, Model, PrimaryKey, Table, Unique } from 'sequelize-typescript';

const SALT_ROUNDS = 10;

@Table({ timestamps: false })
export class User extends Model<TUserFull> {
  @AutoIncrement
  @PrimaryKey
  @Column
  override id!: number

  @AllowNull(false)
  @Matches(Pattern.Name, { message: Message.Name })
  @Column
  first_name!: string
  
  @AllowNull(false)
  @Matches(Pattern.Name, { message: Message.Name })
  @Column
  second_name!: string
  
  @AllowNull(true)
  @Column(DataType.STRING(255))
  display_name: string | null = null
  
  @AllowNull(false)
  @Matches(Pattern.Login, { message: Message.Login })
  @Unique
  @Column
  login!: string
  
  @AllowNull(false)
  @IsEmail({}, { message: Message.Email })
  @Unique
  @Column
  email!: string
  
  @AllowNull(false)
  @Column
  password!: string
  
  @AllowNull(false)
  @Matches(Pattern.Phone, { message: Message.Phone })
  @Unique
  @Column
  phone!: string

  @Column(DataType.STRING)
  avatar: string | null = null;
  
  @BeforeSave
  static async hashPassword(user: User) {
    if (user.changed('password')) {
      const isPasswordValid = await validate(
        user.password, { constraints: { matches: Pattern.Password } });
      
      if (isPasswordValid.length) {
        throw new Error(Message.Password);
      }
      
      const hash = await bcrypt.hash(user.password, SALT_ROUNDS);
      user.password = hash;
    }
  }
  
  async checkPassword(password: string): Promise<boolean> {
    try {
      return await bcrypt.compare(password, this.password);
    } catch (error) {
      throw new Error(`Error checking password: ${error}`);
    }
  }
}
