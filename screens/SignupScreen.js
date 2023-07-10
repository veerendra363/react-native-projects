import { useContext, useState } from "react"
import AuthContent from "../components/Auth/AuthContent"
import { createUser } from "../util/auth"
import LoadingOverlay from "../components/ui/LoadingOverlay"
import { Alert } from "react-native"
import { AuthContext } from "../store/auth-context"

function SignupScreen() {
  const [isUserCreating, setIsUserCreating] = useState(false)

  const authCtx = useContext(AuthContext)

  async function signupHandler({ email, password }) {
    setIsUserCreating(true)
    try {
      const token = await createUser(email, password)
      authCtx.authenticate(token)
    } catch (error) {
      Alert.alert(
        "SingUp request Failed!",
        "Could not create user, Please check your input and try again later.",
      )
    }
    setIsUserCreating(false)
  }

  if (isUserCreating) return <LoadingOverlay message="Creating user..." />
  return <AuthContent onAuthenticate={signupHandler} />
}

export default SignupScreen
