export const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .normalize("NFD") // Decompose accents from letters
    .replace(/[\u0300-\u036f]/g, "") // Remove accent marks
    .trim()
    .replace(/[^a-z0-9\s-]/g, "") // Remove invalid characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-"); // Replace multiple hyphens with one
};
