export function getLogoPath(subscriptionName) {
  // Handles spaces and special characters for URLs
  const fileName = encodeURIComponent(subscriptionName) + ".png";
  return `/src/assets/logos/${fileName}`;
}
