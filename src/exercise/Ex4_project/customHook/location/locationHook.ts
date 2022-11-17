import { actionCreateLocations, actionGetLocations } from "exercise/Ex4_project/actions/locationActions";
import { useDispatch } from "react-redux";

const useLocation = () => {
  const dispatch = useDispatch();
  const getLocation = (variables: any) => {
    dispatch(actionGetLocations(variables));
  };
  const createLocation = (variables: any) => {
    dispatch(actionCreateLocations(variables));
  };
  
  return { getLocation, createLocation};
};
export default useLocation;
