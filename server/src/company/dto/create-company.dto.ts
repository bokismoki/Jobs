import { IsString, MinLength, MaxLength, Matches } from "class-validator"

export class CreateCompanyDto {
    @IsString()
    @MaxLength(100)
    name: string

    @IsString()
    @Matches(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/, {
        message: 'Please enter a valid email'
    })
    email: string

    @IsString()
    @MinLength(2)
    @MaxLength(25)
    location: string

    @IsString()
    size: string

    @IsString()
    @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/, {
        message: 'Password is too weak, please use numbers, symbols and upper case'
    })
    @MinLength(8)
    password: string
}