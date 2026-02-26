export const isValidMobileNumber = (mobile) => {
  // Indian mobile number example (10 digits, starts with 6–9)
  const mobileRegex = /^[6-9]\d{9}$/;
  return mobileRegex.test(mobile);
};

export const isValidSearchQuery = (q) => {
  if (!q) return false;
  if (q.trim().length < 2) return false;
  return true;
};
