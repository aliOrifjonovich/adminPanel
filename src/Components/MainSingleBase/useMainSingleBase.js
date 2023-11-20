import React, { useEffect } from "react";
import Input from "Components/Form/Input/Input";
import PhoneInput from "Components/Form/PhoneInput/PhoneInput";
import Label from "Components/Label/Label";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { showAlert } from "redux/alert/alert.thunk";
import { queryClient } from "services/http-client";
import {
  UseDeleteMain,
  UseGetMainById,
  UsePatchMain,
  UsePostMain,
} from "services/main.service";
import WSelect from "Components/Form/WSelect/WSelect";
import Textarea from "Components/Form/TextArea/TextArea";
import UploadImage from "Components/Form/UploadImage/UploadImage";
import UploadImages from "Components/Form/UploadImages/UploadImages";
import WColorPicker from "Components/Form/ColorPicker/ColorPicker";
import YandexMap from "Components/YandexMap/YandexMap";

const userTypeOptions = [
  {
    label: "USER",
    value: "3110a62f-7774-442a-b9b3-2d762d3b791a",
  },
  {
    label: "ADMIN",
    value: "64b8d97f-5b9e-4ffc-bbaa-94038b6694be",
  },
];
const relationFields = (tab_name) => {
  switch (tab_name) {
    case "product":
      return [
        {
          tab_name: "category",
          inputName: "category_id",
          isMulti: false,
        },
        {
          tab_name: "size",
          inputName: "sizes_ids",
          isMulti: true,
        },
        {
          tab_name: "university",
          inputName: "university_id",
          isMulti: false,
        },
      ];
    case "product_image":
      return [
        {
          tab_name: "product",
          inputName: "product_id",
          isMulti: false,
        },
      ];
    case "order":
      return [
        {
          tab_name: "user",
          inputName: "user_data_id",
          isMulti: false,
        },
      ];

    default:
      return [];
  }
};

const useMainSingleBase = () => {
  const { tab_name, id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const expanded = useSelector((state) => state.sidebar.expand);
  const expandedSinglePage = useSelector(
    (state) => state.sidebar.expandSinglePage
  );

  const { data, isLoading } = UseGetMainById({
    id: id,
    tab_name,
    querySettings: {
      enabled: id !== "create",
    },
  });

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      role_id:
        tab_name === "user"
          ? {
              label: "USER",
              value: "3110a62f-7774-442a-b9b3-2d762d3b791a",
            }
          : undefined,
    },
  });

  useEffect(() => {
    if (id !== "create") {
      for (let item in data) {
        if (item !== "created_at" && item !== "updated_at")
          setValue(item, data[item]);

        if (Array.isArray(data[item]) || data[item] === null) {
          if (tab_name === "product_image") {
            setValue(item, data[item]);
          } else {
            setValue(
              `${item}_ids`,
              data[item]?.map((elem) => ({ label: elem.code, value: elem.id }))
            );
            setValue(item, undefined);
          }
        }

        if (
          typeof data[item] === "object" &&
          !Array.isArray(data[item]) &&
          data[item] !== null
        ) {
          data[item] = {
            label:
              data[item]?.name ||
              data[item]?.title ||
              `${data[item]?.first_name} ${data[item]?.last_name}`,
            value: data[item]?.id,
          };

          if (item !== "role_data") setValue(`${item}_id`, data[item]);
          setValue(item, undefined);
        }
        if (tab_name === "product_image")
          setValue("product_id", data.product_data);
      }
      if (tab_name === "user") {
        setValue("role_id", {
          label: data?.role_data?.label,
          value: data?.role_id,
        });
      }
    }
  }, [data, setValue, id, tab_name]);

  const { mutate: mainMutate } = UsePostMain({
    onSuccess: (res) => {
      dispatch(showAlert("Successfully created", "success"));
      navigate(`/main/${tab_name}`);
      reset();
      queryClient.refetchQueries("GET_MAIN");
    },
    onError: (err) => {},
  });

  const { mutate: userUpdateMutate } = UsePatchMain({
    onSuccess: (res) => {
      dispatch(showAlert("Successfully Updated", "success"));
      navigate(`/main/${tab_name}`);
      reset();
      queryClient.refetchQueries("GET_MAIN");
    },
    onError: (err) => {},
  });

  const onSubmit = (data) => {
    for (let elem in data) {
      if (
        relationFields(tab_name)
          .map((item) => item.inputName)
          .includes(elem)
      ) {
        if (Array.isArray(data[elem])) {
          data[elem] = data[elem]?.map((el) => el.value);
        } else {
          data[elem] = data[elem].value;
        }
      }
    }

    let apiData =
      tab_name === "user"
        ? {
            ...data,
            role_id: data.role_id.value,
            role_data: undefined,
          }
        : {
            ...data,
            price: +data?.price || undefined,
            sizes: data.sizes_ids || undefined,
          };

    if (data.position?.length) {
      apiData = {
        ...apiData,
        lat: data.position[0],
        long: data.position[1],
        position: undefined,
        searchAddress: undefined,
      };
    }

    if (id === "create") {
      mainMutate({
        tab_name,
        apiData,
      });
    } else {
      userUpdateMutate({
        id,
        tab_name,
        apiData,
      });
    }
  };

  const inputs = () => {
    switch (tab_name) {
      case "user":
        return (
          <>
            <Label label="First name*">
              <Input
                control={control}
                placeholder="Enter first name"
                name="first_name"
                validation={{
                  required: {
                    value: true,
                    message: "required",
                  },
                }}
                errors={errors}
              />
            </Label>
            <Label label="Last name*">
              <Input
                control={control}
                placeholder="Enter last name"
                name="last_name"
                validation={{
                  required: {
                    value: true,
                    message: "required",
                  },
                }}
                errors={errors}
              />
            </Label>
            <Label label="Phone number">
              <PhoneInput
                mask="+\9\9\8 (99) 999-99-99"
                maskChar="_"
                name="phone_number"
                control={control}
                errors={errors}
                validation={{
                  required: {
                    value: true,
                    message: "Обязательное поле",
                  },
                  validate: {
                    isFull: (value) => {
                      if (value.includes("_")) return "Invalid phone";
                    },
                  },
                }}
              />
            </Label>
            <Label label="User name">
              <Input
                control={control}
                placeholder="Enter user name"
                name="username"
              />
            </Label>
            <Label label="Password">
              <Input
                control={control}
                placeholder="Enter password"
                name="password"
                typePassword
              />
            </Label>
            <Label label="Role type">
              <WSelect
                name="role_id"
                control={control}
                options={userTypeOptions}
                defaultValue={{
                  label: "USER",
                  value: "3110a62f-7774-442a-b9b3-2d762d3b791a",
                }}
                errors={errors}
                validation={{
                  required: {
                    value: true,
                    message: "Обязательное поле",
                  },
                }}
              />
            </Label>
          </>
        );

      case "application":
        return (
          <>
            <Label label="First name*">
              <Input
                control={control}
                placeholder="Enter first name"
                name="full_name"
                validation={{
                  required: {
                    value: true,
                    message: "required",
                  },
                }}
                errors={errors}
              />
            </Label>
            <Label label="Phone number">
              <PhoneInput
                mask="+\9\9\8 (99) 999-99-99"
                maskChar="_"
                name="phone_number"
                control={control}
                errors={errors}
                validation={{
                  required: {
                    value: true,
                    message: "Обязательное поле",
                  },
                  validate: {
                    isFull: (value) => {
                      if (value.includes("_")) return "Invalid phone";
                    },
                  },
                }}
              />
            </Label>
            <Label label="Description">
              <Textarea
                placeholder="description"
                control={control}
                name="description"
                validation={{
                  required: {
                    value: true,
                    message: "Обязательное поле",
                  },
                  validate: {
                    freeSpace: (value) => {
                      if (!value.trim().length) return "Обязательное поле";
                    },
                  },
                }}
                errors={errors}
              />
            </Label>
          </>
        );

      case "banner":
        return (
          <UploadImage
            control={control}
            errors={errors}
            name="image_url"
            setValue={setValue}
          />
        );
      case "category":
        return (
          <>
            <Label label="Name">
              <Input
                control={control}
                placeholder="Enter name"
                name="name"
                validation={{
                  required: {
                    value: true,
                    message: "required",
                  },
                }}
                errors={errors}
              />
            </Label>
            <UploadImage
              control={control}
              errors={errors}
              name="image_url"
              setValue={setValue}
            />
          </>
        );
      case "product":
        return (
          <>
            <Label label="Name">
              <Input
                control={control}
                placeholder="Enter name"
                name="title"
                validation={{
                  required: {
                    value: true,
                    message: "required",
                  },
                }}
                errors={errors}
              />
            </Label>
            <UploadImage
              control={control}
              errors={errors}
              name="image_url"
              setValue={setValue}
            />
            <Label label="Subtitle">
              <Input
                control={control}
                placeholder="Enter subtitle"
                name="subtitle"
                validation={{
                  required: {
                    value: true,
                    message: "required",
                  },
                }}
                errors={errors}
              />
            </Label>
            <Label label="Description">
              <Textarea
                placeholder="description"
                control={control}
                name="description"
                validation={{
                  required: {
                    value: true,
                    message: "Обязательное поле",
                  },
                  validate: {
                    freeSpace: (value) => {
                      if (!value.trim().length) return "Обязательное поле";
                    },
                  },
                }}
                errors={errors}
              />
            </Label>
            <Label label="Price">
              <Input
                control={control}
                placeholder="Enter price"
                name="price"
                type="number"
                validation={{
                  required: {
                    value: true,
                    message: "required",
                  },
                }}
                errors={errors}
              />
            </Label>
          </>
        );

      case "size":
        return (
          <Label label="Size">
            <Input
              control={control}
              placeholder="Enter size"
              name="code"
              validation={{
                required: {
                  value: true,
                  message: "required",
                },
              }}
              errors={errors}
            />
          </Label>
        );
      case "university":
        return (
          <>
            <Label label="University">
              <Input
                control={control}
                placeholder="Enter university name"
                name="title"
                validation={{
                  required: {
                    value: true,
                    message: "required",
                  },
                }}
                errors={errors}
              />
            </Label>
            <UploadImage
              control={control}
              errors={errors}
              name="image_url"
              setValue={setValue}
            />
            <Label label="Description">
              <Textarea
                placeholder="description"
                control={control}
                name="description"
                validation={{
                  required: {
                    value: true,
                    message: "Обязательное поле",
                  },
                  validate: {
                    freeSpace: (value) => {
                      if (!value.trim().length) return "Обязательное поле";
                    },
                  },
                }}
                errors={errors}
              />
            </Label>
          </>
        );

      case "product_image":
        return (
          <>
            <Label label="Color">
              <WColorPicker control={control} name="rgb" />
            </Label>
            <Label label="Images">
              <UploadImages
                control={control}
                name="image_urls"
                required={true}
                setValue={setValue}
              />
            </Label>
          </>
        );
      case "order":
        return (
          <>
            <Label label="Additional phone">
              <PhoneInput
                mask="+\9\9\8 (99) 999-99-99"
                maskChar="_"
                name="additional_phone"
                control={control}
                errors={errors}
                validation={{
                  required: {
                    value: true,
                    message: "Обязательное поле",
                  },
                  validate: {
                    isFull: (value) => {
                      if (value.includes("_")) return "Invalid phone";
                    },
                  },
                }}
              />
            </Label>
            <Label label="Address">
              <YandexMap
                control={control}
                name="address"
                setValue={setValue}
                errors={errors}
              />
            </Label>
          </>
        );

      default:
        break;
    }
  };

  const { mutate: mainDeleteMutate } = UseDeleteMain({
    onSuccess: () => {
      dispatch(showAlert("Successfully deleted", "success"));
      queryClient.refetchQueries("GET_MAIN");
    },
    onError: () => {},
  });

  const handleDeleteSingle = () => {
    mainDeleteMutate({ id, tab_name });
    navigate(`/main/${tab_name}`);
  };

  return {
    expanded,
    expandedSinglePage,
    tab_name,
    handleSubmit,
    onSubmit,
    control,
    errors,
    id,
    inputs,
    navigate,
    handleDeleteSingle,
    relations: relationFields(tab_name),
    isLoading,
  };
};

export default useMainSingleBase;
