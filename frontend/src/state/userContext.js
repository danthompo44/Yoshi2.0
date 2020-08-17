import { createContext } from 'react';

import { initialUserData } from '../providers/UserProvider';

const UserContext = createContext(initialUserData);

export default UserContext;
