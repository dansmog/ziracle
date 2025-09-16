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
  "juwonanthony+1@gmail.com",
];

export const isAllowedDomain = (email: string) => {
  return ALLOWED_EMAILS.some((domain) => email.endsWith(domain));
};

export const ALLOWED_EMAILS_BREVO_LIST_ID = {
  ac_uk: 5,
};
