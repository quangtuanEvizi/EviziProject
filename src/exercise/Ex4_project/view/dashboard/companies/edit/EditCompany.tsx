import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "../../../../components/form/Input";
import useCompany from "exercise/Ex4_project/customHook/company/companyHook";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  ButtonEdit,
  EditContainer,
  EditForm,
  EditFormHeader,
  EditHeader,
  H1,
} from "exercise/Ex4_project/styleComponent/editStyle";

export interface IFormInput {
  maxUsers: number;
  maxLocations: number;
}

const schema = Yup.object({
  maxUsers: Yup.number().required(),
  maxLocations: Yup.number().required(),
}).required();

export default function EditCompany() {
  const createSuccess = useSelector(
    (state: any) => state.companyReducer.messageSuccess
  );
  const listError = useSelector(
    (state: any) => state.companyReducer.messageFail
  );
  const companyDetail = useSelector(
    (state: any) => state.companyReducer.company
  );

  const { getCompanyById } = useCompany();
  const history = useHistory();
  const { companyId } = useParams<{ companyId: string }>();

  useEffect(() => {
    getCompanyById(parseInt(companyId));
  }, [companyId]);

  // useEffect(() => {
  //   if(!companyDetail){
  //     history.push("/dashboard/companies");
  //   }
  // }, [companyDetail])

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

  return (
    <EditContainer>
      <EditHeader>
        <h1>Company Details</h1>
        <Link to="/dashboard/companies">
          <span>{"< Companies"}</span>
        </Link>
      </EditHeader>
      <FormEdit companyDetail={companyDetail} companyId={companyId} />
    </EditContainer>
  );
}

const FormEdit = (props: any) => {
  const { updateCompany } = useCompany();
  const { companyDetail, companyId } = props;
  const [isEdit, setIsEdit] = useState(false);
  const [buttonType, setButtonType] = useState("Edit");
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    setValue("maxUsers", companyDetail?.maxUsers, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue("maxLocations", companyDetail?.maxLocations, {
      shouldValidate: true,
      shouldDirty: true,
    });
  }, [companyDetail]);

  const onSubmit: SubmitHandler<IFormInput> = (values) => {
    if (buttonType === "Edit") {
      setIsEdit(true);
      setButtonType("Save");
    } else if (buttonType === "Save") {
      updateCompany(parseInt(companyId), values);
    }
  };

  return (
    <EditForm onSubmit={handleSubmit(onSubmit)}>
      <EditFormHeader>
        <H1>{companyDetail?.name}</H1>
        <ButtonEdit onClick={handleSubmit(onSubmit)}>{buttonType}</ButtonEdit>
      </EditFormHeader>
      <Input
        label="Max Users *: "
        name="maxUsers"
        disable={!isEdit}
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
        type="number"
        placeholder="Max locations here ..."
        register={register("maxLocations", {
          required: true,
          maxLength: 50,
        })}
        error={errors?.maxLocations?.message}
        disable={!isEdit}
      />
    </EditForm>
  );
};
