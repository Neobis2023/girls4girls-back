import { registerDecorator, ValidationOptions } from 'class-validator';
import { isPhoneNumber } from '../is-phone-number';

export const IsPhoneNumberDecorator = (
  validationOptions?: ValidationOptions,
) => {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      name: 'IsPhoneNumber',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(phoneNumber: string) {
          return isPhoneNumber(phoneNumber);
        },
        defaultMessage: () => 'Incorrect phone number format',
      },
    });
  };
};
