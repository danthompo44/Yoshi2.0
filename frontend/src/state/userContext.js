import { createContext } from 'react';
import { login, signup } from '../services/userService';

const user = {
    isLoggedIn: false,
    id: null,
    email: null,
    errors: {
        clearError: (err) => {},
        clearErrors: () => {},
        errors: [],
    },
    functions: {
        login,
        signup,
        logout: () => {},
    },
};

const UserContext = createContext(user);

export default UserContext;
