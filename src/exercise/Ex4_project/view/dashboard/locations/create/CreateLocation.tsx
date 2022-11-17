import { Link, useHistory } from "react-router-dom";
import Input from "../../../../components/form/Input";
import Select from "../../../../components/form/Select";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import useCompany from "exercise/Ex4_project/customHook/company/companyHook";
import useRegion from "exercise/Ex4_project/customHook/region/regionHook";
import useLocation from "exercise/Ex4_project/customHook/location/locationHook";
import {
  ButtonForm,
  CreateContainer,
  CreateForm,
  CreateHeader,
  H1,
} from "exercise/Ex4_project/styleComponent/createStyle";

export interface IFormInput {
  name: string;
  companyId: number;
  regionId: number;
}

const schema = Yup.object({
  name: Yup.string().required(),
  companyId: Yup.number().required(),
  regionId: Yup.number().required(),
}).required();

export default function CreateLocation() {
  const history = useHistory();
  const { getCompany, loadmoreCompany } = useCompany();
  const { getRegion, loadmoreRegion } = useRegion();
  const { createLocation } = useLocation();
  const variablesSearch = { first: 20, after: null };

  const [regionLocalState, setRegionLocalState] = useState([]);
  const [companyLocalState, setCompanyLocalState] = useState([]);
  const [companyNameDisplay, setCompanyNameDisplay] = useState("");
  const [regionNameDisplay, setRegionNameDisplay] = useState("");

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

  const isSuccess = useSelector(
    (state: any) => state.locationReducer.isSuccess
  );
  const listError = useSelector(
    (state: any) => state.locationReducer.messageFail
  );

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
  });

  /*-----------------------
  UseEffect
  -----------------------*/
  useEffect(() => {
    setRegionLocalState([]);
    setCompanyLocalState([]);
  }, []);

  useEffect(() => {
    if (isSuccess) {
      history.push("/dashboard/locations");
      return;
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  useEffect(() => {
    if (listError) {
      listError.forEach((e: any) => {
        alert(e?.message);
      });
    }
  }, [listError]);

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

  /*-----------------------
  Event handle
  -----------------------*/

  // Company
  const handleSelectCompany = (item: any) => {
    setValue("companyId", parseInt(item));
    const companyDetail: any = companyLocalState.find((company: any) => {
      return company.node.id === item;
    });
    setRegionLocalState(companyDetail?.node?.regions?.edges);
    if (getValues("regionId")) {
      setRegionNameDisplay("");
    }
  };

  const handleLoadmoreCompany = () => {
    loadmoreCompany({
      first: 20,
      after: pageInfoCompany?.endCursor,
    });
  };

  const handelSearchInputCompany = (companyName: string) => {
    let variables = {};
    variables = { ...variablesSearch, name: companyName };
    getCompany(variables);
  };

  const setDisplayCompany = (item: any) => {
    setCompanyNameDisplay(item);
  };

  // Region
  const handleSelectRegion = (item: any) => {
    if (!getValues("companyId")) {
      setValue("regionId", parseInt(item));
      const regionDetail: any = regionLocalState.find((region: any) => {
        return region.node.id === item;
      });
      setValue("companyId", parseInt(regionDetail?.node?.company?.id));
      setCompanyNameDisplay(regionDetail?.node?.company?.name);
    } else {
      setValue("regionId", parseInt(item));
      const regionDetail: any = regionLocalState.find((region: any) => {
        return region.node.id === item;
      });
      if (
        getValues("companyId") !== parseInt(regionDetail?.node?.company?.id)
      ) {
        setValue("companyId", parseInt(regionDetail?.node?.company?.id));
        setCompanyNameDisplay(regionDetail?.node?.company?.name);
      }
    }
  };

  const handleLoadmoreRegion = () => {
    loadmoreRegion({
      first: 20,
      after: pageInfoRegion?.endCursor,
    });
  };

  const handelSearchInputRegion = (regionName: string) => {
    let variables = {};
    variables = { ...variablesSearch, name: regionName };
    getRegion(variables);
  };

  const setDisplayRegion = (item: any) => {
    setRegionNameDisplay(item);
  };

  // -----------
  const onSubmit: SubmitHandler<IFormInput> = (values) => {
    createLocation(values);
  };

  const getSelectOption = (type: string, name: string) => {
    let variables = {};
    switch (type) {
      case "company": {
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
        if (getValues("regionId")) {
          variables = { ...variablesSearch, name: "" };
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
    }
  };

  return (
    <CreateContainer>
      <CreateHeader>
        <H1>New Location</H1>
        <Link to="/dashboard/locations">
          <span>{"< Location"}</span>
        </Link>
      </CreateHeader>
      <CreateForm onSubmit={handleSubmit(onSubmit)}>
        <Select
          label="Company *:"
          name="company"
          placeholder={"Select .... "}
          disable={false}
          options={companyLocalState}
          pageInfo={pageInfoCompany}
          error={errors?.companyId}
          onHandleInputClick={() => getSelectOption("company", "")}
          onHandleLoadMore={handleLoadmoreCompany}
          onChange={handleSelectCompany}
          onHandelSearchInput={handelSearchInputCompany}
          valueDisplay={companyNameDisplay}
          setDisplay={setDisplayCompany}
        />
        <Select
          label="Region *:"
          name="region"
          placeholder={"Select .... "}
          disable={false}
          options={regionLocalState}
          pageInfo={pageInfoRegion}
          error={errors?.regionId}
          onHandleInputClick={() => getSelectOption("region", "")}
          onHandleLoadMore={handleLoadmoreRegion}
          onChange={handleSelectRegion}
          onHandelSearchInput={handelSearchInputRegion}
          valueDisplay={regionNameDisplay}
          setDisplay={setDisplayRegion}
        />
        <Input
          label="Name *:"
          name="name"
          disable={false}
          type="text"
          placeholder="Name region here ..."
          register={register("name", {
            required: true,
            maxLength: 50,
          })}
          error={errors?.name?.message}
        />
        <ButtonForm type="submit">Submit</ButtonForm>
      </CreateForm>
    </CreateContainer>
  );
}
