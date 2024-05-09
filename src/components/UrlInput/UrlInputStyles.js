// UrlInputStyles.js

export const wrapperStyle = {
  display: 'flex',
  alignItems: 'center',
  flexShrink: 0,
  background: '#D9D9D9',

};

export const inputStyle = {
  flexGrow: 1,
  border: 'none',
  padding: '10px',
  outline: 'none',
  fontSize: 'calc(9px + (24 - 12) * ((100vw - 400px) / (1600 - 400)))',
 width:'100%'
};

export const buttonStyle = {
  width: 'auto',
  flexShrink: 0,
  color: '#fff',
  border: 'none',
  cursor: 'pointer',
  outline: 'none',
  lineHeight: '48px',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  paddingInline: '10px',
  fontSize: 'calc(9px + (24 - 12) * ((100vw - 500px) / (1900 - 100)))',
};
