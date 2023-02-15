export function removePlusFromPhoneNumber(phoneNumber: string) {
  if (phoneNumber[0] === '+') {
    return phoneNumber.substr(1);
  }
  return phoneNumber;
}
