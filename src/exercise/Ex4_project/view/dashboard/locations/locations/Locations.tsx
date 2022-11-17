import React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AiFillCloseCircle, AiFillCheckCircle } from "react-icons/ai";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import { HiOutlinePlusSm } from "react-icons/hi";
import { Link } from "react-router-dom";
import { IconContext } from "react-icons";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import useLocation from "exercise/Ex4_project/customHook/location/locationHook";
import {
  ButtonPagination,
  HeaderLink,
  HeaderList,
  HeaderSearch,
  InputSearch,
  ListContainer,
  ListPagination,
} from "exercise/Ex4_project/styleComponent/listStyle";
import EmptyPage from "exercise/Ex4_project/components/emptyPage";
import Loadding from "exercise/Ex4_project/components/loadding/Loadding";

export default function Locations() {
  const [locationName, setLocationName] = useState("");
  const [prevLocationName, setPrevLocationName] = useState("");
  const [locationLocalState, setLocationLocalState] = useState([]);
  const { getLocation } = useLocation();
  const locations = useSelector(
    (state: any) => state.locationReducer?.locations?.edges
  );
  const pageInfo = useSelector(
    (state: any) => state.locationReducer?.locations?.pageInfo
  );
  const isLoadding = useSelector(
    (state: any) => state.locationReducer.isLoadding
  );
  /*---------------------
  UseEffect
  -----------------------*/
  useEffect(() => {
    getLocation({ first: 20, after: null });
  }, []);

  useEffect(() => {
    if (locations) {
      setLocationLocalState(locations);
    }
  }, [locations]);

  /*---------------------
  Event handle
  -----------------------*/
  const handleChangeLocationName = (e: any) => {
    setLocationName(e.target.value);
  };

  const handlePress = (e: any) => {
    if (e.key === "Enter") {
      if (prevLocationName !== locationName) {
        getLocation({ first: 20, after: null, name: locationName });
        setPrevLocationName(locationName);
      }
    }
  };

  const handleFetchNext = () => {
    let variables = {
      first: 20,
      after: `${pageInfo?.endCursor}`,
      name: locationName,
    };
    getLocation(variables);
  };

  const handleFetchPrev = () => {
    let variables = {
      last: 20,
      before: `${pageInfo?.startCursor}`,
      name: locationName,
    };
    getLocation(variables);
  };

  return (
    <ListContainer>
      <HeaderList>
        <HeaderLink>
          <h2>Locations</h2>
          <Link to="/dashboard/create/location">
            {" "}
            <HiOutlinePlusSm /> CREATE NEW LOCATION
          </Link>
        </HeaderLink>
        <HeaderSearch>
          <InputSearch
            type="text"
            value={locationName}
            placeholder="Search location..."
            onChange={(e) => handleChangeLocationName(e)}
            onKeyPress={(e) => handlePress(e)}
          />
        </HeaderSearch>
      </HeaderList>
      {isLoadding ? (
        <Loadding />
      ) : (
        <>
          {locationLocalState?.length > 0 ? (
            <>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>LOCATION</TableCell>
                      <TableCell align="right">COMPANY</TableCell>
                      <TableCell align="right">REGION</TableCell>
                      <TableCell align="right">IS DEMO</TableCell>
                      <TableCell align="right">IS ACTIVE</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {locationLocalState?.map((row: any) => (
                      <TableRow
                        key={row?.node?.id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          <Link to={`/dashboard/locations/${row?.node?.id}`}>
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
                          <Link
                            to={`/dashboard/regions/${row?.node?.region?.id}`}
                          >
                            {row?.node?.region?.name}
                          </Link>
                        </TableCell>
                        <TableCell align="right">
                          {row?.node?.demo ? (
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
