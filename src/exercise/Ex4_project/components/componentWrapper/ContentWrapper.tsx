import React, { useEffect } from "react";
import Inspections1 from "../../view/dashboard/impection/Inspections1";
import Companies from "../../view/dashboard/companies/companies/Companies";
import Regions from "../../view/dashboard/regions/regions/Regions";
import Locations from "../../view/dashboard/locations/locations/Locations";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  HIGHEST_ROLE,
  MANAGER_ROLE,
  STORAGE_TOKEN,
} from "../../utils/constant";
import CreateCompany from "../../view/dashboard/companies/create/CreateCompany";
import EditCompany from "../../view/dashboard/companies/edit/EditCompany";
import CreateRegion from "../../view/dashboard/regions/create/CreateRegion";
import EditRegions from "../../view/dashboard/regions/edit/EditRegions";
import CreateLocation from "../../view/dashboard/locations/create/CreateLocation";
import { PrivateRouter } from "./PrivateRouter";

const ContentWrapper: React.FC<any> = () => {
  const userInfo = useSelector((state: any) => state?.user.userInfor);
  return (
    <>
      {userInfo && (
        <Switch>
          <Route
            exact
            path="/dashboard"
            render={({ location }) => (
              <Redirect
                to={{
                  pathname: "/dashboard/inspections",
                  state: { from: location },
                }}
              />
            )}
          />
          <Route exact path="/dashboard/inspections" component={Inspections1} />
          <PrivateRouter
            exact
            role={userInfo?.data?.data?.user?.role}
            security={HIGHEST_ROLE}
            path="/dashboard/companies"
          >
            <Companies />
          </PrivateRouter>

          <PrivateRouter
            exact
            role={userInfo?.data?.data?.user?.role}
            security={HIGHEST_ROLE}
            path="/dashboard/create/company"
          >
            <CreateCompany />
          </PrivateRouter>
          <PrivateRouter
            exact
            role={userInfo?.data?.data?.user?.role}
            security={HIGHEST_ROLE}
            path="/dashboard/companies/:companyId"
          >
            <EditCompany />
          </PrivateRouter>
          <PrivateRouter
            exact
            role={userInfo?.data?.data?.user?.role}
            security={MANAGER_ROLE}
            path="/dashboard/regions"
          >
            <Regions />
          </PrivateRouter>
          <PrivateRouter
            exact
            role={userInfo?.data?.data?.user?.role}
            security={MANAGER_ROLE}
            path="/dashboard/create/region"
          >
            <CreateRegion />
          </PrivateRouter>
          <PrivateRouter
            exact
            role={userInfo?.data?.data?.user?.role}
            security={HIGHEST_ROLE}
            path="/dashboard/regions/:regionId"
          >
            <EditRegions />
          </PrivateRouter>
          <PrivateRouter
            exact
            role={userInfo?.data?.data?.user?.role}
            security={MANAGER_ROLE}
            path="/dashboard/locations"
          >
            <Locations />
          </PrivateRouter>
          <PrivateRouter
            exact
            role={userInfo?.data?.data?.user?.role}
            security={MANAGER_ROLE}
            path="/dashboard/create/location"
          >
            <CreateLocation />
          </PrivateRouter>
          <Redirect from="*" to="/dashboard" />
        </Switch>
      )}
    </>
  );
};

export default ContentWrapper;
