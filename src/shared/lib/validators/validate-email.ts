export function validateEmail(email: string): boolean {
  // Паттерн для валидации email
  const emailPattern: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

  // Проверка соответствия email паттерну
  return emailPattern.test(email)
}
