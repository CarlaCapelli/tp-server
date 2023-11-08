import { NotContains } from "class-validator";

export class CreateUserDto {
    @NotContains(" ")
    username: string;

    password: string;
    
    name: string;
  }
  