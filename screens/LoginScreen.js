import { useContext, useState } from 'react';
import AuthContent from '../components/Auth/AuthContent';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { login } from '../util/auth';
import { Alert } from 'react-native';
import { AuthContext } from '../store/auth-context';

function LoginScreen() {
  const [isLoggingIn, setIsLoggingIn] = useState(false)

  const authCtx = useContext(AuthContext)

  async function loginHandler({ email, password }) {
    try {
      setIsLoggingIn(true)
      const token = await login(email, password)
      authCtx.authenticate(token)
      
    } catch (error) {
      Alert.alert(
        'Authentication failed!',
        'Could not log you in. Please check your credentials or try again later!'
      )
    setIsLoggingIn(false)
    }
  }

  if (isLoggingIn) return <LoadingOverlay message="Logging you in..." />
  return <AuthContent isLogin onAuthenticate={loginHandler}/>;
}

export default LoginScreen;
