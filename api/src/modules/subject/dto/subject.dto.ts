import { IsOptional, IsString } from 'class-validator'
import { Expose } from 'class-transformer'

export class CreateSubjectDto {
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    description?: string;
};

export class SubjectDto {
    @Expose()
    id: number;

    @Expose()
    name: string;

    @Expose()
    description?: string;
}
