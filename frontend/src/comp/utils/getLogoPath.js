export const getLogoPath = (subscriptionName) => {
  // Handles spaces and special characters for URLs
  const fileName = encodeURIComponent(subscriptionName) + ".webp";
  return `/logos/${fileName}`;
}


