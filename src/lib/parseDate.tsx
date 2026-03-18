export const parseDate = (date: Date) => {
    return new Intl.DateTimeFormat("pt-BR").format(new Date(date));
};