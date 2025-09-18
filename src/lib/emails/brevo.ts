export async function createContact(
  email: string,
  listIds: number[],
  customAttributes: {
    thankYouUrl?: string;
    shareUrl?: string;
  } = {}
) {
  const attributes: Record<string, unknown> = {};

  if (customAttributes.thankYouUrl) {
    attributes.THANK_YOU_URL = customAttributes.thankYouUrl;
  }
  if (customAttributes.shareUrl) {
    attributes.SHARE_URL = customAttributes.shareUrl;
  }

  const response = await fetch("https://api.brevo.com/v3/contacts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api-key": process.env.NEXT_BREVO_API_KEY!,
    },
    body: JSON.stringify({
      email,
      listIds,
      attributes,
    }),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Brevo API error: ${error.message || response.statusText}`);
  }

  if (response.status === 201) {
    return await response.json();
  }
  if (response.status === 204) {
    return { updated: true };
  }
}
