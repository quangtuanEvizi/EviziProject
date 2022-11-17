import React, { useCallback } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import useCompany from "exercise/Ex4_project/customHook/company/companyHook";
import useRegion from "exercise/Ex4_project/customHook/region/regionHook";
import Input from "../../../../components/form/Input";
import Select from "../../../../components/form/Select";
import * as Yup from "yup";
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
}
const schema = Yup.object({
  name: Yup.string().required(),
  companyId: Yup.number().required(),
}).required();

export default function CreateRegion() {
  const history = useHistory();
  const { getCompany, loadmoreCompany } = useCompany();
  const { createRegion } = useRegion();
  const [isLoad, setIsLoad] = useState(false);
  const [companyNameDisplay, setCompanyNameDisplay] = useState("");

  const listCompany = useSelector(
    (state: any) => state.companyReducer.companies?.edges
  );
  const pageInfo = useSelector(
    (state: any) => state.companyReducer.companies?.pageInfo
  );
  const isSuccess = useSelector((state: any) => state.regionReducer.isSuccess);
  const listError = useSelector(
    (state: any) => state.regionReducer.messageFail
  );

  useEffect(() => {
    if (isSuccess) {
      history.push("/dashboard/regions");
      return;
    }
  }, [isSuccess]);

  useEffect(() => {
    if (listError) {
      listError.forEach((e: any) => {
        console.log(e?.message);
      });
    }
  }, [listError]);

  /*---------------------
  Event handle
  -----------------------*/
  const getCompanySelect = (companyName: string) => {
    const variables = { first: 20, after: null, name: companyName };
    getCompany(variables);
  };

  const handleLoadmore = () => {
    setIsLoad(true);
  };

  const handleChangeValueSelect = useCallback((item: any) => {
    setValue("companyId", parseInt(item), {
      shouldValidate: true,
      shouldDirty: true,
    });
  }, []);

  const handelSearchInput = (companyName: any) => {
    const variables = { first: 20, after: null, name: companyName };
    getCompany(variables);
  };

  const setDisplayCompany = (item: any) => {
    setCompanyNameDisplay(item);
  };

  const onSubmit: SubmitHandler<IFormInput> = (values) => {
    if (!isLoad) {
      createRegion(values);
    } else {
      loadmoreCompany({
        first: 20,
        after: pageInfo?.endCursor,
      });
    }
    setIsLoad(false);
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
  });

  return (
    <CreateContainer>
      <CreateHeader>
        <H1>New Region</H1>
        <Link to="/dashboard/regions">
          <span>{"< Regions"}</span>
        </Link>
      </CreateHeader>
      <CreateForm onSubmit={handleSubmit(onSubmit)}>
        <Select
          label="Company *:"
          name="company"
          placeholder={"Select .... "}
          disable={false}
          options={listCompany}
          pageInfo={pageInfo}
          error={errors?.companyId}
          onHandleInputClick={getCompanySelect}
          onHandleLoadMore={handleLoadmore}
          onChange={handleChangeValueSelect}
          onHandelSearchInput={handelSearchInput}
          valueDisplay={companyNameDisplay}
          setDisplay={setDisplayCompany}
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
