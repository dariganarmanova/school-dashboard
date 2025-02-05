import Authenticate from '../component/Authenticate'
import Register from '../component/Register'
import '../component/ComponentStyle.css'
function AuthPage() {
    return (
        <div className='form-container'>
            <Authenticate />
            <Register />
        </div>
    )
}
export default AuthPage;