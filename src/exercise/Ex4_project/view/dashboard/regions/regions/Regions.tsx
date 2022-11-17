import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { AiFillCloseCircle, AiFillCheckCircle } from "react-icons/ai";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import { HiOutlinePlusSm } from "react-icons/hi";
import { IconContext } from "react-icons";
import { Link } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import useRegion from "exercise/Ex4_project/customHook/region/regionHook";
import {
  ButtonPagination,
  HeaderLink,
  HeaderList,
  ListContainer,
  ListPagination,
} from "exercise/Ex4_project/styleComponent/listStyle";
import EmptyPage from "exercise/Ex4_project/components/emptyPage";
import Loadding from "exercise/Ex4_project/components/loadding/Loadding";

export default function Regions() {
  const { getRegion } = useRegion();
  const [regionLocalState, setRegionLocalState] = useState([]);
  const regions = useSelector(
    (state: any) => state.regionReducer.regions?.edges
  );
  const pageInfo = useSelector(
    (state: any) => state.regionReducer.regions?.pageInfo
  );

  const isLoadding = useSelector(
    (state: any) => state.regionReducer.isLoadding
  );
  useEffect(() => {
    if (regions) {
      setRegionLocalState(regions);
    }
  }, [regions]);

  useEffect(() => {
    getRegion({ first: 20, after: null });
  }, []);

  const handleFetchNext = () => {
    let variables = {};
    variables = { first: 20, after: `${pageInfo?.endCursor}` };
    getRegion(variables);
  };

  const handleFetchPrev = () => {
    let variables = {};
    variables = { last: 20, before: `${pageInfo?.startCursor}` };
    getRegion(variables);
  };

  return (
    <ListContainer>
      <HeaderList>
        <HeaderLink>
          <h2>REGIONS</h2>
          <Link to="/dashboard/create/region">
            {" "}
            <HiOutlinePlusSm /> CREATE NEW REGION
          </Link>
        </HeaderLink>
      </HeaderList>
      {isLoadding ? (
        <Loadding />
      ) : (
        <>
          {regionLocalState.length > 0 ? (
            <>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>REGION</TableCell>
                      <TableCell align="right">COMPANY</TableCell>
                      <TableCell align="right">LOCATION</TableCell>
                      <TableCell align="right">IS ACTIVE</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {regionLocalState?.map((row: any) => (
                      <TableRow
                        key={row?.node?.id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          <Link to={`/dashboard/regions/${row?.node?.id}`}>
                            {row?.node?.name}
                          </Link>
                        </TableCell>
                        <TableCell align="right">
                          <Link
                            to={`/dashboard/companies/${row?.node?.company?.id}`}
                          >
                            {row?.node?.company?.name}
                          </Link>
                        </TableCell>
                        <TableCell align="right">
                          {row?.node?.locations?.edges?.length}
                        </TableCell>
                        <TableCell align="right">
                          {row?.node?.active ? (
                            <IconContext.Provider value={{ color: "green" }}>
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
          ) : (
            <EmptyPage />
          )}
        </>
      )}
    </ListContainer>
  );
}
