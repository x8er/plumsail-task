export const getWeatherImage = (id: number): string => {
  if (id > 800) return `${id >= 802 ? 802 : id}.svg`;

  const groupId = id.toString().charAt(0);

  return `${groupId}.svg`;
};
