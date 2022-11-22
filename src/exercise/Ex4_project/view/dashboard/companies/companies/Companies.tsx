import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import { FaSort } from "react-icons/fa";
import { HiOutlinePlusSm } from "react-icons/hi";
import { ImSearch } from "react-icons/im";
import { omit } from "lodash";
import useCompany from "../../../../customHook/company/companyHook";
import Moment from "react-moment";
import {
  ButtonPagination,
  ButtonSort,
  ButtonSortContainer,
  DivTableData,
  DivTableName,
  HeaderLink,
  HeaderList,
  HeaderSearch,
  InputSearch,
  InputSearchContainer,
  ListContainer,
  ListPagination,
  Table,
  TableBody,
  TableContainer,
  TableData,
  TableHeader,
  TableName,
  TableRow,
} from "exercise/Ex4_project/styleComponent/listStyle";
import { IconContext } from "react-icons";
import { AiFillCloseCircle, AiFillCheckCircle } from "react-icons/ai";
import EmptyPage from "exercise/Ex4_project/components/emptyPage";
import Loadding from "exercise/Ex4_project/components/loadding/Loadding";
import ButtonFilter from "exercise/Ex4_project/components/buttonFilter/ButtonFilter";
import {
  INDUSTRY_FILTERS,
  ISACTIVE_FILTER,
  ISDEMO_FILTER,
  PLAN_LEVEL_FILTERS,
} from "exercise/Ex4_project/utils/filterConstant";
import { QueryCompany } from "exercise/Ex4_project/interface/QueryInterface";
import styled from "styled-components";
export default function Companies() {
  const { getCompany } = useCompany();
  const [companyLocalState, setCompanyLocalState] = useState([]);
  const [companyName, setCompanyName] = useState("");
  const [prevCompanyName, setPrevCompanyName] = useState("");
  const [isSortNameDown, setIsSortNameDown] = useState(true);
  const [isSortCreateAtDown, setIsSortCreateAtDown] = useState(true);
  const [variables, setVariables] = useState({
    first: 20,
    after: null,
  } as QueryCompany);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (companies) {
      setCompanyLocalState(companies);
    }
  }, [companies]);

  useEffect(() => {
    getCompany(variables);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [variables]);
  /*-----------------------------------
EVENT HANDLE
------------------------------------*/

  const handleChangeCompanyName = (e: any) => {
    setCompanyName(e.target.value);
  };

  const handlePress = (e: any) => {
    const resetVariables = { ...variables, after: null };
    if (e.key === "Enter") {
      if (companyName !== prevCompanyName) {
        const filter = { ...resetVariables, name: companyName };
        setVariables(filter);
        setPrevCompanyName(companyName);
      }
    }
  };

  const handleFetchNext = () => {
    const filter = {
      ...variables,
      name: companyName,
      after: `${pageInfo?.endCursor}`,
    };
    setVariables(omit(filter, ["last", "before"]));
  };

  const handleFetchPrev = () => {
    const filter = {
      ...variables,
      name: companyName,
      last: 20,
      before: `${pageInfo?.startCursor}`,
    };
    setVariables(omit(filter, ["first", "after"]));
  };

  const selectOption = (option: any) => {
    const resetVariables = { ...variables, after: null };
    if (option.type) {
      switch (option.type) {
        case "industry":
          if (resetVariables?.industry?.includes(option?.value)) break;
          const filter = { ...resetVariables, industry: option?.value };
          setVariables(filter);
          break;
        case "planLevel":
          if (resetVariables?.planLevel?.includes(option?.value)) break;
          if (!resetVariables.hasOwnProperty("planLevel")) {
            const filter = { ...resetVariables, planLevel: [option?.value] };
            setVariables(filter);
          } else {
            const filter = {
              ...resetVariables,
              planLevel: [...resetVariables?.planLevel, option?.value],
            };
            setVariables(filter);
          }
          break;
        case "demo":
          if (!resetVariables.hasOwnProperty("demo")) {
            const filter = { ...resetVariables, demo: [option?.value] };
            setVariables(filter);
          } else {
            const filter = {
              ...resetVariables,
              demo: [...resetVariables?.demo, option?.value],
            };
            setVariables(filter);
          }
          break;
        case "active":
          if (!resetVariables.hasOwnProperty("active")) {
            const filter = { ...resetVariables, active: [option?.value] };
            setVariables(filter);
          } else {
            const filter = {
              ...resetVariables,
              active: [...resetVariables?.active, option?.value],
            };
            setVariables(filter);
          }
          break;
      }
    } else {
      const filter = { ...resetVariables, name: option?.name };
      setVariables(filter);
    }
  };

  const handleSortName = () => {
    setIsSortNameDown(!isSortNameDown);
    if (isSortNameDown) {
      let variables = {
        first: 20,
        after: null,
        orderBy: { direction: "DESC", field: "NAME" },
      };
      getCompany(variables);
    } else {
      let variables = {
        first: 20,
        after: null,
        orderBy: { direction: "ASC", field: "NAME" },
      };
      getCompany(variables);
    }
  };

  const handleSortCreateAt = () => {
    setIsSortCreateAtDown(!isSortCreateAtDown);
    if (isSortCreateAtDown) {
      let variables = {
        first: 20,
        after: null,
        orderBy: { direction: "DESC", field: "CREATED_AT" },
      };
      getCompany(variables);
    } else {
      let variables = {
        first: 20,
        after: null,
        orderBy: { direction: "ASC", field: "CREATED_AT" },
      };
      getCompany(variables);
    }
  };

  const handleRemoveFilter = (type: string, value: any) => {
    switch (type) {
      case "company":
        setVariables(omit(variables, ["name"]));
        break;
      case "industry":
        setVariables(omit(variables, ["industry"]));
        break;
    }
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
          <ListDependencies>
            {variables?.name && (
              <Dependency
                onClick={() => handleRemoveFilter("company", variables.name)}
              >
                {variables.name}
              </Dependency>
            )}
            {variables?.industry && (
              <Dependency
                onClick={() =>
                  handleRemoveFilter("industry", variables.industry)
                }
              >
                {variables.industry}
              </Dependency>
            )}
            {variables?.planLevel &&
              variables?.planLevel.map((plan: string, index: number) => (
                <Dependency key={index}>{plan}</Dependency>
              ))}
          </ListDependencies>
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
                  <DivTableName>
                    <TableName>
                      <TableHeader>
                        <TableRow>
                          <TableData>
                            NAME
                            <ButtonSortContainer>
                              <ButtonSort onClick={handleSortName}>
                                <FaSort />
                              </ButtonSort>
                            </ButtonSortContainer>
                          </TableData>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {companyLocalState?.map((row: any, i: number) => (
                          <TableRow key={i}>
                            <TableData>
                              <Link
                                to={`/dashboard/companies/${row?.node?.id}`}
                              >
                                {row?.node?.name}
                              </Link>
                            </TableData>
                          </TableRow>
                        ))}
                      </TableBody>
                    </TableName>
                  </DivTableName>

                  <DivTableData>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableData>
                            INDUSTRY{" "}
                            <ButtonFilter
                              options={INDUSTRY_FILTERS}
                              multiSelect={false}
                              selectValueOption={selectOption}
                            />
                          </TableData>
                          <TableData>REGION</TableData>
                          <TableData>
                            PLAN LEVEL{" "}
                            <ButtonFilter
                              options={PLAN_LEVEL_FILTERS}
                              multiSelect={false}
                              selectValueOption={selectOption}
                            />
                          </TableData>
                          <TableData>LOCATION</TableData>
                          <TableData>USERS</TableData>
                          <TableData>INSPECTIONS</TableData>
                          <TableData>
                            IS DEMO
                            <ButtonFilter
                              options={ISDEMO_FILTER}
                              multiSelect={true}
                              selectValueOption={selectOption}
                            />
                          </TableData>
                          <TableData>
                            IS ACTIVE
                            <ButtonFilter
                              options={ISACTIVE_FILTER}
                              multiSelect={true}
                              selectValueOption={selectOption}
                            />
                          </TableData>
                          <TableData>MAX LOCATIONS</TableData>
                          <TableData>MAX USERS</TableData>
                          <TableData>
                            CREATED AT
                            <ButtonSort onClick={handleSortCreateAt}>
                              <FaSort />
                            </ButtonSort>
                          </TableData>
                          <TableData>UPDATED AT</TableData>
                          <TableData>LAST INSPECTION</TableData>
                          <TableData>COMPANY ID</TableData>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {companyLocalState?.map((row: any, i: number) => (
                          <TableRow key={i}>
                            <TableData>{row?.node?.industry}</TableData>
                            <TableData>
                              {row?.node?.regions?.edges?.length}
                            </TableData>
                            <TableData>{row?.node?.planLevel}</TableData>
                            <TableData>
                              {row?.node?.locations?.edges?.length}
                            </TableData>
                            <TableData>
                              {row?.node?.users?.edges?.length}
                            </TableData>
                            <TableData>
                              {row?.node?.inspections?.edges?.length}
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
                            <TableData>{row?.node?.maxLocations}</TableData>
                            <TableData>{row?.node?.maxUsers}</TableData>
                            <TableData>
                              <Moment format="MMM DD, YYYY">
                                {row?.node?.createdAt}
                              </Moment>
                            </TableData>
                            <TableData>
                              <Moment format="MMM DD, YYYY">
                                {row?.node?.updatedAt}
                              </Moment>
                            </TableData>
                            {row?.node?.lastInspectionAt ? (
                              <TableData>
                                <Moment format="MMM DD, YYYY">
                                  {row?.node?.lastInspectionAt}
                                </Moment>
                              </TableData>
                            ) : (
                              <TableData></TableData>
                            )}

                            <TableData>{row?.node?.id}</TableData>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </DivTableData>
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
const ListDependencies = styled.div`
  width: 100%;
  display: "flex";
  flex-direction: "row";
  flex-wrap: wrap;
`;
const Dependency = styled.span`
  background-color: #7777c8;
  margin: 5px;
  padding: 10px 20px;
  border-radius: 20px;
  font-weight: 700;
  color: white;
`;
