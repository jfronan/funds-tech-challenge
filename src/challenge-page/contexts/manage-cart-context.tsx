import React from 'react';
import { Actions, State } from '../components/reducers/manage-cart';

export const ManageCartContext = React.createContext({cartState: {} as State, cartDispatch: (() => {}) as React.Dispatch<Actions>});
