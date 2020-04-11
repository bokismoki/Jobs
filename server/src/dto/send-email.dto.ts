import { IsString, IsNotEmpty, IsEmail, IsOptional } from "class-validator"

export class SendEmailDto {
    @IsString()
    @IsNotEmpty()
    name: string

    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsOptional()
    @IsString()
    phone: string

    @IsString()
    @IsNotEmpty()
    message: string
}