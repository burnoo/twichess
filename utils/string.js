export const getRatingString = (rating, prov) => {
  return `${rating}${prov ? "?" : ""}`;
}

export const twitchUsernameRegex = /^(#)?[a-zA-Z0-9][\w]{2,24}$/;