import { IsNotEmpty } from "class-validator";
import { Role } from "src/common/enum/rol.enum";

export class ChangeRoleDto {
    @IsNotEmpty()
     idUser:number

     @IsNotEmpty()
     newRole:Role
}
