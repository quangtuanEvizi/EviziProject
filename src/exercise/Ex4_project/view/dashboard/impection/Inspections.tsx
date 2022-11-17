import { actionGetInspection } from "exercise/Ex4_project/actions/inspectionAction";
import ButtonFilter from "exercise/Ex4_project/components/inspections/ButtonFilter";
import useCompany from "exercise/Ex4_project/customHook/company/companyHook";
import useLocation from "exercise/Ex4_project/customHook/location/locationHook";
import useRegion from "exercise/Ex4_project/customHook/region/regionHook";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Inspections() {
  const dispatch = useDispatch();
  const variablesSearch = { first: 20, after: null }
  const { getCompany, loadmoreCompany } = useCompany();
  const { getRegion, loadmoreRegion } = useRegion();
  const { getLocation } = useLocation();
  useEffect(() => {
    setRegionLocalState([]);
    setCompanyLocalState([]);
  }, []);
  //  values state
  const companies = useSelector(
    (state: any) => state.companyReducer.companies?.edges
  );
  const pageInfoCompany = useSelector(
    (state: any) => state.companyReducer.companies?.pageInfo
  );

  const regions = useSelector(
    (state: any) => state.regionReducer.regions?.edges
  );

  const pageInfoRegion = useSelector(
    (state: any) => state.regionReducer.regions?.pageInfo
  );

  const [regionLocalState, setRegionLocalState] = useState([]);
  const [companyLocalState, setCompanyLocalState] = useState([]);
  const [locationLocalState, setLocationLocalState] = useState([]);
  const [companyFilter, setCompanyFilter] = useState([]);
  const [regionFilter, setRegionFilter] = useState([] as any);
  const [locationFilter, setLocationFilter] = useState([]);
  const variables = {
    first: 20,
    after: null,
    company: companyFilter,
    region: regionFilter,
  };

  const inspections = useSelector(
    (state: any) => state.inspectionReducer.inspections?.edges
  );
  useEffect(() => {
    if (companies) {
      setCompanyLocalState(companies);
    }
  }, [companies]);

  useEffect(() => {
    if (regions) {
      setRegionLocalState(regions);
    }
  }, [regions]);

  const getSelectOption = (type: string, name: string) => {
    let variables = {};
    switch (type) {
      case "company": {
        console.log('to hreer ');
        
        if (name) {
          variables = { ...variablesSearch, name: name };
          getCompany(variables);
        } else if (
          !companyLocalState ||
          (companyLocalState && companyLocalState.length === 0)
        ) {
          variables = variablesSearch;
          getCompany(variables);
        }
        break;
      }
      case "region": {
        if (name) {
          variables = { ...variablesSearch, name: name };
          getRegion(variables);
        } else if (
          !regionLocalState ||
          (regionLocalState && regionLocalState.length === 0)
        ) {
          variables = variablesSearch;
          getRegion(variables);
        }
        break;
      }
      case "location": {
        if (name) {
          variables = { ...variablesSearch, name: name };
          getLocation(variables);
        } else if (
          !locationLocalState ||
          (locationLocalState && locationLocalState.length === 0)
        ) {
          variables = variablesSearch;
          getLocation(variables);
        }
      }
    }
  };
  //  ====================SELECT COMPANY FUNCTION===========================
  const handleSelectCompany = (item: any) => {
    setCompanyFilter(item);
    const companyDetail: any = companyLocalState.find((company: any) => {
      return company.node.id === item;
    });
    setRegionLocalState(companyDetail?.node?.regions?.edges);
  };

  //  ====================SELECT REGION FUNCTION===========================
  const handleSelectRegion = (item: any) => {
    setRegionFilter((prev: any) => [...prev, item]);
    const regionDetail: any = regionLocalState.find((region: any) => {
      return region.node.id === item;
    });
    setLocationLocalState(regionDetail?.node?.locations?.edges);
  };
  //  ====================SELECT LOCATION FUNCTION===========================
  const handleSelectLocation = (item: any) => {
    console.log(item);
  };
  return (
    <div>
      {companyFilter}
      <br />
      {regionFilter}
      {/* <ButtonFilter
        options={companyLocalState}
        name={"Company"}
        onClickButton={getSelectOption("company", "")}
        onChange={handleSelectCompany}
      />
      <ButtonFilter
        options={regionLocalState}
        name={"region"}
        onClickButton={getSelectOption("region", "")}
        onChange={handleSelectRegion}
      />

      <ButtonFilter
        options={locationLocalState}
        name={"location"}
        onClickButton={getSelectOption("location", "")}
        onChange={handleSelectLocation}
      /> */}
      {inspections?.map((inspect: any, i: number) => {
        return <li key={i}>{inspect?.node?.reference}</li>;
      })}
    </div>
  );
}
