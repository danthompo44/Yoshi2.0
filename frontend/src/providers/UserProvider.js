import React, { useReducer, useCallback, useEffect } from 'react';
import UserContext from '../state/userContext';
import service from '../services/userService';

export const initialUserData = {
    isLoggedIn: false,
    id: null,
    token: null,
    errors: [],
};

function UserProvider({ children }) {
    const [state, dispatch] = useReducer(userReducer, initialUserData);

    const refreshToken = useCallback(async () => {
        try {
            const userId = getUserIdFromStorage();

            if (!userId) {
                throw Error('User must already be logged in');
            }
            const res = await service.refreshToken(userId);
            const newToken = res.data.token;

            dispatch({
                type: 'login',
                payload: {
                    token: newToken,
                    id: userId,
                },
            });
        } catch (err) {
            dispatch({
                type: 'add_error',
                payload: err,
            });
        }
    }, []);

    function getUserIdFromStorage() {
        return localStorage.getItem('userId');
    }

    useEffect(() => {
        const tryLogin = async () => {
            await refreshToken();
        };

        tryLogin();
    }, [refreshToken]);

    return (
        <UserContext.Provider value={{ state, dispatch }}>
            {children}
        </UserContext.Provider>
    );
}

export default UserProvider;

function userReducer(state, action) {
    switch (action.type) {
        case 'logout':
            return initialUserData;
        case 'login':
            return {
                ...state,
                isLoggedIn: true,
                id: action.payload.id,
                token: action.payload.token,
                errors: [],
            };
        case 'signup':
            return {
                ...state,
                isLoggedIn: true,
                id: action.payload.id,
                token: action.payload.token,
                errors: [],
            };
        case 'token_reset':
            return {
                ...state,
                isLoggedIn: true,
                token: action.payload.token,
            };
        case 'add_error':
            return {
                ...state,
                errors: [...state.errors, action.payload],
            };
        case 'error_reset': {
            return {
                ...state,
                errors: [],
            };
        }
        default:
            return state;
    }
}
