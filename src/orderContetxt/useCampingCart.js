import React, { useReducer, useContext, createContext, useEffect } from 'react';
import { reducer, init } from './cartReducer';
import useLocalStorage from './useLocalStorage';

const CampingCartContext = createContext(null);

export const CampingCartProvider = ({
  children,
  initialCartItems = [],
  localStorageKey = 'campingCart',
}) => {
  let items = initialCartItems;
  if (!items.length) {
    try {
      const item = window.localStorage.getItem(localStorageKey);
      items = item ? JSON.parse(item) : [];
    } catch (error) {
      console.log(error);
      items = [];
    }
  }

  const [state, dispatch] = useReducer(reducer, items, init);
  // localstorage -> localstoragekey: items[]
  const [storedValue, setValue] = useLocalStorage(localStorageKey, items);

  useEffect(() => {
    if (JSON.stringify(state.items) !== storedValue) {
      setValue(state.items);
    }
  }, [state]);

  const addItem = (item) => {
    dispatch({
      type: 'ADD_ITEM',
      payload: item,
    });
  };

  const removeItem = (id) => {
    dispatch({
      type: 'REMOVE_ITEM',
      payload: {
        id,
      },
    });
  };

  const plusOne = (id) => {
    return dispatch({
      type: 'PLUS_ONE',
      payload: {
        id,
      },
    });
  };

  const minusOne = (id) => {
    return dispatch({
      type: 'MINUS_ONE',
      payload: {
        id,
      },
    });
  };

  const updateItem = (item) => {
    dispatch({
      type: 'UPDATE_ITEM',
      payload: item,
    });
  };

  const clearCart = () => {
    dispatch({
      type: 'CLEAR_CART',
    });
  };
  return (
    <CampingCartContext.Provider
      value={{
        state,
        addItem,
        plusOne,
        minusOne,
        updateItem,
        removeItem,
        clearCart,
      }}
    >
      {children}
    </CampingCartContext.Provider>
  );
};

export const useCampingCart = () => useContext(CampingCartContext);
