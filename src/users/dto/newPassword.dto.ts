import { IsNotEmpty } from "class-validator";

export class NewPasswordDto {
    @IsNotEmpty()
    username: string
    
    @IsNotEmpty()
    newPassword: string
}
