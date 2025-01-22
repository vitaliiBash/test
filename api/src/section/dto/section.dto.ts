import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Expose } from 'class-transformer';


export class FilterSectionsDto {
  @IsString()
  @IsOptional()
  teacherId?: string

  @IsString()
  @IsOptional()
  subjectId?: number
}

export class CreateSectionDto {
    @IsString()
    teacherId: string;

    @IsNumber()
    subjectId: number;
}

export class SectionScheduleDto {
  @Expose()
  id: number

  @Expose()
  sectionId: number

  @Expose()
  classroomId: number

  @Expose()
  startDateTime: Date

  @Expose()
  endDateTime: Date
}

export class SectionDto {
  @Expose()
  id: string

  @Expose()
  teacherId: number

  @Expose()
  subjectId: number
}
