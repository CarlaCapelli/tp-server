import { IsNotEmpty } from "class-validator";

export class ChangePasswordDto {
    @IsNotEmpty()
    username: string

    @IsNotEmpty()
    oldPassword: string

    @IsNotEmpty()
    newPassword: string
}
