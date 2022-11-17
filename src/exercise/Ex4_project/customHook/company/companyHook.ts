import { useDispatch } from "react-redux";
import {
  actionCreateCompany,
  actionGetCompany,
  actionGetCompanyById,
  actionUpdateCompanyRequest,
  loadMoreCompanyRequest,
} from "../../actions/companyAction";

const useCompany = () => {
  const dispatch = useDispatch();
  const getCompany = (variables: any) => {
    dispatch(actionGetCompany(variables));
  };
  const createCompany = (variables: any) => {
    dispatch(actionCreateCompany(variables));
  };
  const getCompanyById = (companyId: number) => {
    dispatch(actionGetCompanyById(companyId));
  };
  const updateCompany = (companyId: number, values: any) => {
    dispatch(actionUpdateCompanyRequest({ companyId, values }));
  };
  const loadmoreCompany = (variables: any) => {
    dispatch(loadMoreCompanyRequest(variables));
  };

  return {
    getCompany,
    createCompany,
    getCompanyById,
    updateCompany,
    loadmoreCompany,
  };
};
export default useCompany;
