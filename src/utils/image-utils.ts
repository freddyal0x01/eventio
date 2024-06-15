export const getAvatarFallbackName = (name?: string | null) => {
  if (!name) return "";
  const [first, second] = name.split(" ");
  return `${first?.[0]}${second ? second?.[0] : ""}`;
};

export const getUploadthingUrl = (fileKey?: string | null) => {
  return fileKey ? `https://uploadthing.com/f/${fileKey}` : "";
};
