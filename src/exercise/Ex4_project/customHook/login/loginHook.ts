import { actionLogin } from 'exercise/Ex4_project/actions/loginAction';
import { useDispatch } from 'react-redux';
import { IFormInput } from 'exercise/Ex4_project/view/login/Login';

const useLogin = () => {
    const dispatch = useDispatch();
    const login = (variables:IFormInput) => {
        dispatch(actionLogin(variables))
    }
    return {login: login}
}
export default useLogin