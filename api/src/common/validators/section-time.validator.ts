import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator'

import * as moment from 'moment'

interface ValidationObject {
  startHour: number
  startMinute: number
  duration: number
}

@ValidatorConstraint({ name: 'TimeConstraints', async: false })
class TimeConstraints<T extends ValidationObject> implements ValidatorConstraintInterface {
  validate(_, args: ValidationArguments) {
    const obj = args.object

    const { startHour, startMinute, duration } = obj as T

    const startTime = moment({ hour: startHour, minute: startMinute })
    const endTime = startTime.clone().add(duration, 'minutes')

    const earliestStart = moment('07:30', 'HH:mm')
    const latestEnd = moment('22:00', 'HH:mm')

    const isStartValid = startTime.isSameOrAfter(earliestStart)
    const isEndValid = endTime.isSameOrBefore(latestEnd)

    return isStartValid && isEndValid
  }

  defaultMessage() {
    return 'startTime must be at or after 07:30 and endTime must be at or before 22:00'
  }
}

export function TimeConstraintsValidator<T extends ValidationObject>(validationOptions?: ValidationOptions) {
  return function (constructor) {
    registerDecorator({
      name: 'TimeConstraints',
      target: constructor,
      propertyName: '__classValidatorTimeConstraints__',
      options: validationOptions,
      constraints: [],
      validator: TimeConstraints<T>,
    })
  }
}
