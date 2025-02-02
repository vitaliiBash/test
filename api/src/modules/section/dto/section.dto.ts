import { IsEnum, IsIn, IsInt, IsNumber, IsOptional, IsString, Max, Min } from 'class-validator'
import { Expose, Transform } from 'class-transformer'
import * as moment from 'moment'

import { TimeConstraintsValidator } from 'src/common/validators/section-time.validator'

import { Day } from 'src/types/enum/days'

export class FilterSectionScheduleDto {
  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsNumber()
  sectionId?: number
}

@TimeConstraintsValidator<ScheduleSectionDto>()
export class ScheduleSectionDto {
  @IsInt()
  classroomId: number

  @IsEnum(Day)
  day: Day

  @IsInt()
  @Min(7)
  @Max(21)
  startHour: number

  @IsInt()
  @Min(0)
  @Max(59)
  startMinute: number

  @IsIn([50, 80])
  duration: number
}

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
  teacherId: string

  @IsNumber()
  subjectId: number
}

export class SectionScheduledDto {
  @Expose()
  id: number

  @Expose()
  sectionId: number

  @Expose()
  classroomId: number

  @Expose()
  day: Day

  @Expose()
  @Transform(({ value }: { value: Date }) => moment(value).format('HH:mm'))
  startTime: string

  @Expose()
  @Transform(({ value }: { value: Date }) => moment(value).format('HH:mm'))
  endTime: string
}

export class SectionDto {
  @Expose()
  id: string

  @Expose()
  teacherId: number

  @Expose()
  subjectId: number
}
