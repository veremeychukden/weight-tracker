module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      cyan:{
        light: '#06B6D4'
      },
      sky:{
        light: '#DDD6FE'
      },
      rose:{
        light: '#FFE4E6'
      },
      blue:{
        light: '#BFDBFE'
      },
      white: '#FFFFFF'
    }
  },
  variants: {
    extend: {
      animation: ['motion-safe'],
    },
  },
  screens: {
    'sm' : '640px',
    'md' : '768px',
    'lg' : '1024px',
    'xl' : '1280px',
    '2xl' : '1536px'
  },
  plugins: [],
}
