export const getIconColor = (color: 'primary' | 'secondary' | 'accent') => {
  if (color === 'primary') {
    return '#000';
  }

  if (color === 'secondary') {
    return '#afadb5';
  }

  return '#518581';
};
