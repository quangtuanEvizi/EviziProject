import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "../../../../components/form/Input";
import { useForm, SubmitHandler } from "react-hook-form";
import useCompany from "exercise/Ex4_project/customHook/company/companyHook";
import {
  ButtonForm,
  CreateContainer,
  CreateForm,
  CreateHeader,
  H1,
} from "exercise/Ex4_project/styleComponent/createStyle";

export interface IFormInput {
  name: string;
  maxUsers: number;
  maxLocations: number;
}

const schema = Yup.object({
  name: Yup.string().required(),
  maxUsers: Yup.number().required(),
  maxLocations: Yup.number().required(),
}).required();

export default function CreateCompany() {
  const history = useHistory();
  const { createCompany } = useCompany();

  const createSuccess = useSelector(
    (state: any) => state.companyReducer.messageSuccess
  );
  const listError = useSelector(
    (state: any) => state.companyReducer.messageFail
  );

  useEffect(() => {
    if (createSuccess) {
      history.push("/dashboard/companies");
      return;
    }
  }, [createSuccess]);

  useEffect(() => {
    if (listError) {
      listError.forEach((e: any) => {
        alert(e?.message);
      });
    }
  }, [listError]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<IFormInput> = (values) => {
    createCompany(values);
  };

  return (
    <CreateContainer>
      <CreateHeader>
        <H1>New Company</H1>
        <Link to="/dashboard/companies">
          <span>{"< Companies"}</span>
        </Link>
      </CreateHeader>
      <CreateForm onSubmit={handleSubmit(onSubmit)} >
        <Input
          label="Name *:"
          name="name"
          type="text"
          placeholder="Company name ..."
          register={register("name", {
            required: true,
            maxLength: 50,
          })}
          error={errors?.name?.message}
          disable={false}
        />
        <Input
          label="Max Users *: "
          name="maxUsers"
          disable={false}
          type="number"
          placeholder="Max user here ..."
          register={register("maxUsers", {
            required: true,
            maxLength: 50,
          })}
          error={errors?.maxUsers?.message}
        />
        <Input
          label="Max Location *:"
          name="maxLocations"
          disable={false}
          type="number"
          placeholder="Max locations here ..."
          register={register("maxLocations", {
            required: true,
            maxLength: 50,
          })}
          error={errors?.maxLocations?.message}
        />
        <ButtonForm type="submit">Submit</ButtonForm>
      </CreateForm>
    </CreateContainer>
  );
}
