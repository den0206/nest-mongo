import { IsArray, IsMongoId, IsString } from 'class-validator';

export class User {
  @IsString()
  @IsMongoId()
  _id: string;

  @IsString()
  email: string;

  @IsArray()
  roles: [];

  @IsString()
  passwordHash: string;
}
