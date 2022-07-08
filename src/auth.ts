/**
 * This represents some generic auth provider API, like Firebase.
 */
const mockAuth = {
  isAuthenticated: false,
  signin(callback: VoidFunction) {
    mockAuth.isAuthenticated = true;
    setTimeout(callback, 100); // fake async
  },
  signout(callback: VoidFunction) {
    mockAuth.isAuthenticated = false;
    setTimeout(callback, 100);
  },
};

export { mockAuth };
