import { actionGetInspection } from "exercise/Ex4_project/actions/inspectionAction";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import ButtonFilter from "exercise/Ex4_project/components/inspections/ButtonFilter";
import styled from "styled-components";
import useCompany from "exercise/Ex4_project/customHook/company/companyHook";
import useRegion from "exercise/Ex4_project/customHook/region/regionHook";
import {
  ButtonPagination,
  HeaderLink,
  HeaderList,
  ListContainer,
  ListPagination,
} from "exercise/Ex4_project/styleComponent/listStyle";
import Loadding from "exercise/Ex4_project/components/loadding/Loadding";

export default function Inspection1() {
  const dispatch = useDispatch();
  const { getCompany, loadmoreCompany } = useCompany();
  const { getRegion, loadmoreRegion } = useRegion();
  const variablesSearch = { first: 20, after: null };

  const [localInspectionState, setLocalInspectionState] = useState([]);
  const [companyLocalState, setCompanyLocalState] = useState([]);
  const [regionLocalState, setRegionLocalState] = useState([]);
  const [companyFilter, setCompanyFilter] = useState<{
    id: number;
    name: string;
  }>();
  const [regionFilter, setRegionFilter] = useState([] as any);

  const inspections = useSelector(
    (state: any) => state.inspectionReducer.inspections?.edges
  );
  const pageInfo = useSelector(
    (state: any) => state.inspectionReducer.inspections?.pageInfo
  );
  const isLoadding = useSelector(
    (state: any) => state.inspectionReducer.isLoadding
  );
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

  useEffect(() => {
    dispatch(actionGetInspection({ first: 20, after: null }));
  }, []);

  useEffect(() => {
    if (inspections) {
      setLocalInspectionState(inspections);
    }
  }, [inspections]);

  useEffect(() => {
    setCompanyLocalState([]);
  }, []);

  const handleFetchNext = () => {
    let variables = {
      first: 20,
      after: `${pageInfo?.endCursor}`,
    };
    dispatch(actionGetInspection(variables));
  };

  const handleFetchPrev = () => {
    let variables = {
      last: 20,
      before: `${pageInfo?.startCursor}`,
    };
    dispatch(actionGetInspection(variables));
  };

  const getCompanyOption = (name: string) => {
    if (companyLocalState?.length === 0) {
      const variables = { ...variablesSearch, name: name };
      getCompany(variables);
    }
  };

  const selectCompanyOption = (item: any) => {
    const companyDetail: any = companyLocalState.find((company: any) => {
      return company.node.id === item.id;
    });
    setRegionLocalState(companyDetail?.node?.regions?.edges);
    setCompanyFilter({ id: item.id, name: item.name });
  };

  const getRegionOption = (name: string) => {
    if (regionLocalState?.length === 0) {
      const variables = { ...variablesSearch, name: name };
      getRegion(variables);
    }
  };

  const selectRegionOption = (item: any) => {
    
    setRegionFilter((prev: any) => [...prev, { id: item.id, name: item.name }]);
  };

  return (
    <ListContainer>
      <HeaderList>
        <HeaderLink>
          <h2>INSPECTION</h2>
        </HeaderLink>
        <SelectContanier>
          <ButtonFilter
            name="Company"
            options={companyLocalState}
            getOption={getCompanyOption}
            selectValueOption={selectCompanyOption}
          />
          <ButtonFilter
            name="Region"
            options={regionLocalState}
            getOption={getRegionOption}
            selectValueOption={selectRegionOption}
          />
        </SelectContanier>
      </HeaderList>
      <ListDependencies>
        {companyFilter && <Dependency>{companyFilter.name}</Dependency>}

        {regionFilter?.map(
          (dependency: { id: number; name: string }, i: number) => (
            <Dependency key={i}>{dependency.name}</Dependency>
          )
        )}
      </ListDependencies>
      {isLoadding ? (
        <Loadding />
      ) : (
        <>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>UNIT ID</TableCell>
                  <TableCell align="right">COMPANY</TableCell>
                  <TableCell align="right">REGION</TableCell>
                  <TableCell align="right">LOCATION</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {localInspectionState?.map((row: any) => (
                  <TableRow
                    key={row?.node?.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      <Link to={``}>{row?.node?.reference}</Link>
                    </TableCell>
                    <TableCell align="right">
                      {row?.node?.company?.name}
                    </TableCell>
                    <TableCell align="right">
                      {row?.node?.region?.name}
                    </TableCell>
                    <TableCell align="right">
                      {row?.node?.location?.name}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <ListPagination>
            <ButtonPagination
              onClick={() => handleFetchPrev()}
              disabled={!pageInfo?.hasPreviousPage}
            >
              <GrFormPrevious />
            </ButtonPagination>
            <ButtonPagination
              onClick={() => handleFetchNext()}
              disabled={!pageInfo?.hasNextPage}
            >
              <GrFormNext />
            </ButtonPagination>
          </ListPagination>
        </>
      )}
    </ListContainer>
  );
}

const SelectContanier = styled.div`
  display: flex;
  width: 60%;
`;
const ListDependencies = styled.div`
  display: "flex";
  flex-direction: "row";
`;
const Dependency = styled.div`
  background-color: #7777c8;
  display: inline;
  height: auto;
  margin: 5px;
  padding: 10px 20px;
  border-radius: 20px;
  font-weight: 700;
  color: white;
`;
