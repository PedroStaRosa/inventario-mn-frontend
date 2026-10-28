const calcPercentage = (current: number, previous: number) => {
  if (previous === 0) {
    if (current === 0) {
      return 0;
    }

    return 0;
  }
  const delta = ((current - previous) / previous) * 100;
  return Number(delta.toFixed(2));
};

export default calcPercentage;
