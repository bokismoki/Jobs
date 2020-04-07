import { IsOptional, IsString, IsNotEmpty } from "class-validator"

export class GetJobsPaginationDto {
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    skip: string
}