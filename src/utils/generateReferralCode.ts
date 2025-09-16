export function generateReferralCode(length = 8) {
  const chars = "ABCDEFGQIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwsyz123456789";
  let code = "";
  for (let i = 0; i < length; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}
