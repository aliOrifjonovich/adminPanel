export const formatPhone = (originalNumber) => {
  const regexPattern = /^(\+\d{3})(\d{2})(\d{3})(\d{2})(\d{2})$/;
  const formattedNumber = originalNumber.replace(
    regexPattern,
    "$1 ($2) $3 $4 $5"
  );

  return formattedNumber;
};
