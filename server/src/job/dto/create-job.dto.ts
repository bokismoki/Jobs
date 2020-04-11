import { IsString, MaxLength, Matches, IsNotEmpty } from "class-validator"

export class CreateJobDto {
    @IsString()
    @MaxLength(50)
    @IsNotEmpty()
    title: string

    @IsString()
    @Matches(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&\/\/=]*)/, {
        message: 'Please enter a valid job post url'
    })
    @IsNotEmpty()
    job_link: string

    @IsString()
    @MaxLength(255)
    @IsNotEmpty()
    description: string

    @IsString()
    @IsNotEmpty()
    companyId: number
}