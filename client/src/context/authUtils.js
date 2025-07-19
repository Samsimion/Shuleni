

export const tokenKey = 'auth_token';

export const isAdmin = (user) => user?.role === 'admin';

export const saveUserToStorage = (user) => {
  localStorage.setItem('user', JSON.stringify(user));
};

export const removeUserFromStorage = () => {
  localStorage.removeItem('user');
  localStorage.removeItem(tokenKey);
};
