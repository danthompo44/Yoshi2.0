import React, { useState } from 'react';
import UserContext from '../state/userContext';
import * as service from '../services/userService';

function UserProvider({ children }) {
    const initialUserData = {
        isLoggedIn: false,
        id: null,
        email: null,
        error: {
            clearError,
            clearErrors,
            errors: [],
        },
        functions: { login, logout, signup },
    };
    const [user, setUser] = useState(initialUserData);

    function clearError(err) {
        setUser({
            ...user,
            errors: user.errors.filter((item) => item !== err),
        });
    }

    function clearErrors() {
        setUser({
            ...user,
            errors: [],
        });
    }

    async function login(email, password) {
        try {
            const userData = await service.login(email, password);
            setUser({
                ...user,
                id: userData.id,
                email: email,
                isLoggedIn: true,
            });
        } catch (err) {
            console.log(err);
            setUser({
                ...user,
                error: { ...user.error, errors: [...user.error.errors, err] },
            });
        }
    }

    function logout() {
        setUser(initialUserData);
    }

    async function signup(email, password) {
        try {
            const userData = await service.signup(email, password);
            setUser({
                ...user,
                id: userData.id,
                email: email,
                isLoggedIn: true,
            });
        } catch (err) {
            console.log(err);
            setUser({
                ...user,
                error: { ...user.error, errors: [...user.error.errors, err] },
            });
        }
    }

    return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}

export default UserProvider;
