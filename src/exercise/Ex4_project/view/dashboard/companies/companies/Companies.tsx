import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AiFillCloseCircle, AiFillCheckCircle } from "react-icons/ai";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import { HiOutlinePlusSm } from "react-icons/hi";
import { ImSearch } from "react-icons/im";
import { IconContext } from "react-icons";
import useCompany from "../../../../customHook/company/companyHook";
import {
  ButtonPagination,
  DivTableList,
  HeaderLink,
  HeaderList,
  HeaderSearch,
  InputSearch,
  InputSearchContainer,
  ListContainer,
  ListPagination,
  TableContainer,
  TableData,
  TableHead,
  TableHeader,
  TableList,
  TableName,
  TableRow,
} from "exercise/Ex4_project/styleComponent/listStyle";
import EmptyPage from "exercise/Ex4_project/components/emptyPage";
import Loadding from "exercise/Ex4_project/components/loadding/Loadding";

export default function Companies() {
  const { getCompany } = useCompany();
  const [companyLocalState, setCompanyLocalState] = useState([]);
  const [companyName, setCompanyName] = useState("");
  const [prevCompanyName, setPrevCompanyName] = useState("");
  const companies = useSelector(
    (state: any) => state.companyReducer.companies?.edges
  );
  const pageInfo = useSelector(
    (state: any) => state.companyReducer.companies?.pageInfo
  );
  const isLoadding = useSelector(
    (state: any) => state.companyReducer.isLoadding
  );
  useEffect(() => {
    getCompany({ first: 20, after: null });
  }, []);

  useEffect(() => {
    if (companies) {
      setCompanyLocalState(companies);
    }
  }, [companies]);

  /*-----------------------------------
EVENT HANDLE
------------------------------------*/

  const handleChangeCompanyName = (e: any) => {
    setCompanyName(e.target.value);
  };

  const handlePress = (e: any) => {
    if (e.key === "Enter") {
      if (companyName !== prevCompanyName) {
        getCompany({ first: 20, after: null, name: companyName });
        setPrevCompanyName(companyName);
      }
    }
  };

  const handleFetchNext = () => {
    let variables = {
      first: 20,
      after: `${pageInfo?.endCursor}`,
      name: companyName,
    };
    getCompany(variables);
  };

  const handleFetchPrev = () => {
    let variables = {
      last: 20,
      before: `${pageInfo?.startCursor}`,
      name: companyName,
    };
    getCompany(variables);
  };

  return (
    <>
      <ListContainer>
        <HeaderList>
          <HeaderLink>
            <h2>Companies</h2>
            <Link to="/dashboard/create/company">
              <span>
                <HiOutlinePlusSm size={30} /> CREATE NEW COMPANY
              </span>
            </Link>
          </HeaderLink>
          <HeaderSearch>
            <InputSearchContainer>
              <ImSearch size={20} />
              <InputSearch
                type="text"
                value={companyName}
                placeholder="Search companies..."
                onChange={(e) => handleChangeCompanyName(e)}
                onKeyPress={(e) => handlePress(e)}
                disabled={isLoadding}
              />
            </InputSearchContainer>
          </HeaderSearch>
        </HeaderList>
        {isLoadding ? (
          <Loadding />
        ) : (
          <>
            {companyLocalState?.length > 0 ? (
              <>
                <TableContainer>
                  <DivTableList>
                    <TableList>
                      <TableHead>
                        <TableRow>
                          <TableHeader>NAME</TableHeader>
                          <TableHeader>INDUSTRY</TableHeader>
                          <TableHeader>REGION</TableHeader>
                          <TableHeader>PLAN LEVEL</TableHeader>
                          <TableHeader>LOCATION</TableHeader>
                          <TableHeader>IS DEMO</TableHeader>
                          <TableHeader>IS ACTIVE</TableHeader>
                        </TableRow>
                      </TableHead>
                      {/* <tbody>
                        {companyLocalState?.map((row: any) => (
                          <TableRow>
                            <TableData>{row?.node?.name}</TableData>
                            <TableData>{row?.node?.industry}</TableData>
                            <TableData>
                              {row?.node?.regions?.edges?.length}
                            </TableData>
                            <TableData>{row?.node?.planLevel}</TableData>
                            <TableData>
                              {row?.node?.locations?.edges?.length}
                            </TableData>
                            <TableData>
                              {row?.node?.demo ? (
                                <IconContext.Provider
                                  value={{ color: "green" }}
                                >
                                  <div>
                                    <AiFillCheckCircle />
                                  </div>
                                </IconContext.Provider>
                              ) : (
                                <IconContext.Provider value={{ color: "red" }}>
                                  <div>
                                    <AiFillCloseCircle />
                                  </div>
                                </IconContext.Provider>
                              )}
                            </TableData>
                            <TableData>
                              {row?.node?.active ? (
                                <IconContext.Provider
                                  value={{ color: "green" }}
                                >
                                  <div>
                                    <AiFillCheckCircle />
                                  </div>
                                </IconContext.Provider>
                              ) : (
                                <IconContext.Provider value={{ color: "red" }}>
                                  <div>
                                    <AiFillCloseCircle />
                                  </div>
                                </IconContext.Provider>
                              )}
                            </TableData>
                          </TableRow>
                        ))}
                      </tbody> */}
                    </TableList>
                  </DivTableList>
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
            ) : (
              <EmptyPage />
            )}
          </>
        )}
      </ListContainer>
    </>
  );
}
