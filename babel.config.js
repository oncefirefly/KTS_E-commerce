module.exports = (api) => {
  api.cache.using(() => process.env.NODE_ENV);

  return {
    plugins: [process.env.NODE_ENV === 'development' && 'react-refresh/babel'].filter(Boolean),
    presets: ['@babel/preset-env', '@babel/preset-react'],
  };
};
