export const parseDate = (date: Date) => {
  return new Intl.DateTimeFormat("pt-BR").format(new Date(date));
};

export const diffDays = (date: Date) => {
  return Math.floor(
    (new Date().getTime() - new Date(date).getTime()) / (1000 * 60 * 60 * 24)
  );
};
