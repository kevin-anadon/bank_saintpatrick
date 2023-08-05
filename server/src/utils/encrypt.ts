import bcrypt from 'bcryptjs';

export const encrypt = (pin: string) => {
  const salt = bcrypt.genSaltSync(10)
  return bcrypt.hashSync(pin, salt)
}