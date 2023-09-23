import { ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, registerDecorator, ValidationArguments, ValidationError } from 'class-validator';

@ValidatorConstraint({ name: 'isOneOrZero', async: false })
export class IsOneOrZeroConstraint implements ValidatorConstraintInterface {
  validate(value: any, _args: ValidationArguments) {
    if (value === undefined || value === null) {
      return true; 
    }

    return value === 0 || value === 1;
  }

  defaultMessage(_args: ValidationArguments) {
    const {property} = _args
    return property + '必須為1或是0'
  }
}

export function IsOneOrZero(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsOneOrZeroConstraint,
    });
  };
}

export const formatValidatorError = (errors: ValidationError[]): string => {
    return Object.values(errors[0].constraints || {})[0]
}

export * from 'class-validator'