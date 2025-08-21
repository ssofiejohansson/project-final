export function getLogoPath(subscriptionName) {
  // Replace spaces with %20 for URL encoding
  const fileName = `${subscriptionName}.png`.replace(/ /g, "%20");
  return `/Logos/${fileName}`;
}
