import {
  actionCreateRegions,
  actionGetRegionById,
  actionGetRegions,
  actionUpdateRegions,
  loadMoreRegionRequest,
} from "exercise/Ex4_project/actions/regionAction";
import { useDispatch } from "react-redux";

const useRegion = () => {
  const dispatch = useDispatch();
  const getRegion = (variables: any) => {
    dispatch(actionGetRegions(variables));
  };
  const createRegion = (variables: any) => {
    dispatch(actionCreateRegions(variables));
  };
  const getRegionById = (regionsId: number) => {
    dispatch(actionGetRegionById(regionsId));
  };
  const updateRegion = (regionId: number, values: any) => {
    dispatch(actionUpdateRegions({ regionId, values }));
  };
  const loadmoreRegion = (variables: any) => {
    dispatch(loadMoreRegionRequest(variables));
  };

  return {
    getRegion,
    createRegion,
    getRegionById,
    updateRegion,
    loadmoreRegion,
  };
};
export default useRegion;
