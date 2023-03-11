import bcrypt from 'bcrypt';
import { IsEmail, Matches, validate } from 'class-validator';
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
  
  @Column(DataType.STRING(255))
  display_name!: string | null
  
  @AllowNull(false)
  @Matches(Pattern.Login, { message: Message.Login })
  @Unique({ name: 'login', msg: 'Login must be unique'})
  @Column
  login!: string
  
  @AllowNull(false)
  @IsEmail({}, { message: Message.Email })
  @Unique({ name: 'email', msg: 'Email must be unique'})
  @Column
  email!: string
  
  @AllowNull(false)
  @Column
  password!: string
  
  @AllowNull(false)
  @Matches(Pattern.Phone, { message: Message.Phone })
  @Unique({ name: 'phone', msg: 'Phone must be unique'})
  @Column
  phone!: string

  @Column(DataType.STRING)
  avatar!: string | null;
  
  @BeforeSave
  static async validateChange (user: User) {
    
    const validationErrors = await validate(user);
    if (validationErrors.length) {
      throw new Error('Some fields are not valid');
    }
    
    if (user.changed('password')) {
      
      if (!Pattern.Password.test(user.password)) {
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
