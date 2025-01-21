import { IsOptional, IsString } from 'class-validator'
import { Expose } from 'class-transformer'

export class CreateClassroomDto {
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    address?: string;
};

export class ClassroomDto {
    @Expose()
    id: number;

    @Expose()
    name: string;

    @Expose()
    address?: string;
}
