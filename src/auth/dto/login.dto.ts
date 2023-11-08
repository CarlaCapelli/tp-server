import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, MinLength, NotContains } from 'class-validator';

export class LoginDto {
  @IsNotEmpty() @NotContains(" ")
  username: string;

  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(6)
  password: string;
}
