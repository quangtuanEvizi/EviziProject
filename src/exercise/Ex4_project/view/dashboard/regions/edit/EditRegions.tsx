import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";
import Input from "../../../../components/form/Input";
import Select from "../../../../components/form/Select";
import useRegion from "exercise/Ex4_project/customHook/region/regionHook";
import useCompany from "exercise/Ex4_project/customHook/company/companyHook";
import * as Yup from "yup";
import {
  ButtonEdit,
  EditContainer,
  EditForm,
  EditFormHeader,
  EditHeader,
  H1,
} from "exercise/Ex4_project/styleComponent/editStyle";

export interface IFormInput {
  name: string;
  companyId: number;
}
const schema = Yup.object({
  name: Yup.string().required(),
  companyId: Yup.number().required(),
}).required();

export default function EditRegions() {
  const history = useHistory();
  const { getRegionById } = useRegion();
  const { regionId } = useParams<{ regionId: string }>();
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
  const regionDetail = useSelector((state: any) => state.regionReducer.region);

  useEffect(() => {
    getRegionById(parseInt(regionId));
  }, []);

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

  return (
    <EditContainer>
      <EditHeader>
        <H1>Regions Details</H1>
        <Link to="/dashboard/regions">
          <span>{"< Regions"}</span>
        </Link>
      </EditHeader>
      <FormEdit
        regionDetail={regionDetail}
        regionId={regionId}
        listCompany={listCompany}
        pageInfo={pageInfo}
      />
    </EditContainer>
  );
}

const FormEdit = (props: any) => {
  const { regionDetail, regionId, listCompany, pageInfo } = props;
  const { getCompany, loadmoreCompany } = useCompany();
  const { updateRegion } = useRegion();
  const [isEdit, setIsEdit] = useState(false);
  const [buttonType, setButtonType] = useState("Edit");
  const [isLoad, setIsLoad] = useState(false);
  const [companyNameDisplay, setCompanyNameDisplay] = useState("");

  /*---------------------
  UseEffect
  -----------------------*/
  useEffect(() => {
    setValue("companyId", parseInt(regionDetail?.company?.id), {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue("name", regionDetail?.name, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setCompanyNameDisplay(regionDetail?.company?.name);
  }, [regionDetail]);

  /*---------------------
  Event handle
  -----------------------*/
  const handleLoadmore = () => {
    setIsLoad(true);
  };

  const handleChangeValueSelect = (item: any) => {
    setValue("companyId", parseInt(item), {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const setDisplayCompany = (item: any) => {
    setCompanyNameDisplay(item);
  };

  const handelSearchInput = (companyName: any) => {
    const variables = { first: 20, after: null, name: companyName };
    getCompany(variables);
  };

  const getCompanySelect = (companyName: string) => {
    const variables = { first: 20, after: null, name: companyName };
    getCompany(variables);
  };

  const onSubmit: SubmitHandler<IFormInput> = (values) => {
    if (!isLoad) {
      if (buttonType === "Edit") {
        setIsEdit(true);
        setButtonType("Save");
      } else {
        updateRegion(parseInt(regionId), values);
      }
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
    <EditForm onSubmit={handleSubmit(onSubmit)}>
      <EditFormHeader>
        <H1>{regionDetail?.name}</H1>
        <ButtonEdit type="submit" onClick={handleSubmit(onSubmit)}>
          {buttonType}
        </ButtonEdit>
      </EditFormHeader>
      <Select
        label="Company *:"
        name="company"
        placeholder={"Select .... "}
        disable={!isEdit}
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
        disable={!isEdit}
        type="text"
        placeholder="Name region here ..."
        register={register("name", {
          required: true,
          maxLength: 50,
        })}
        error={errors?.name?.message}
      />
    </EditForm>
  );
};
