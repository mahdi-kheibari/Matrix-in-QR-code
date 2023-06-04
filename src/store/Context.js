import React, { useState, createContext } from 'react';
import PropTypes from 'prop-types';
// utils

Context.propTypes = {
  children: PropTypes.node,
};

export const store = createContext({
  QRMatrix: "",
  setQRMatrix: () => { },
})
function Context({ children }) {
  // QR matrix store
  const [QRMatrix, setQRMatrix] = useState([]);
  return (
    <store.Provider value={{
      QRMatrix,
      setQRMatrix
    }}>
      {children}
    </store.Provider>
  );
}

export default Context;