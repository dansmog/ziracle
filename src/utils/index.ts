export const featuresData = [
  {
    id: 1,
    img: "/icons/discover.svg", // Your SVG in public folder
    title: "Discover local deals",
    body: "Find exclusive offers at restaurants near you",
  },
  {
    id: 2,
    img: "/icons/rewards.svg",
    title: "Earn rewards you can spend",
    body: "Get coffee, lunches, crypto, and equity rewards",
  },
  {
    id: 3,
    img: "/icons/share.svg",
    title: "Share and earn",
    body: "Invite friends and make extra income.",
  },
];

export const ALLOWED_EMAILS = ["ac.uk"];
export const WHITELIST = [
  "juwonanthony@gmail.com",
  "coursebuying@gmail.com",
  "coursebuying+10@gmail.com",
  "coursebuying+20@gmail.com",
  "juwonanthony+1@gmail.com",
  "juwonanthony+2@gmail.com",
  "juwonanthony+3@gmail.com",
  "coursebuying+12@gmail.com",
  "adenikebamide782@gmail.com",
  "hamishalawson@gmail.com",
  "hamish@ziracle.com",
  "janethomelawson@gmail.com",
  "jan-home@hotmail.com",
];

export const isAllowedDomain = (email: string) => {
  return ALLOWED_EMAILS.some((domain) => email.endsWith(domain));
};

export const ALLOWED_EMAILS_BREVO_LIST_ID = {
  ac_uk: 5,
};



/**
 * Extracts the local part of an email address (the part before the @).
 * @param email The full email address string.
 * @returns The local part of the email, or null if no @ symbol is found.
 */
export function getLocalPartFromEmail(email: string) {
  if (typeof email !== 'string') {
    return null;
  }
  const atIndex = email.indexOf('@');
  if (atIndex === -1) {
    return null;
  }
  return email.substring(0, atIndex);
}