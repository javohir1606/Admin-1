import { Tabs } from "antd";
import { ReusableForm } from "../Form";
import { useParams, useNavigate } from "react-router-dom";
import { useEditCategory } from "../../Service/Mutation/useEditCategory";
import { useGetSingleData } from "../../Service/Query/useGetSingleData";
import { AttributeValuesType, FormDatas } from "../../Types/data-types";
import { message, UploadFile } from "antd";
import { AttributeForm } from "../Create-Attribute";
import { useAttributeEdit } from "../../Service/Mutation/useAttributeEdit";

export const SubEditTab = () => {
  const { id } = useParams();
  const { data: singleData, isLoading } = useGetSingleData(id);
  const { mutate } = useEditCategory();
  const navigate = useNavigate();
  const { mutate: editAttribute } = useAttributeEdit();

  const submit = (data: FormDatas) => {
    const formData = new FormData();
    formData.append("title", data.title);
    // formData.append("parent", data.parent);

    if (data.image) {
      formData.append("image", data.image.file);
    }

    mutate(
      { id, data: formData },
      {
        onSuccess: () => {
          navigate("/app/sub-category-list");
          message.success("U just edited sub-category");
        },
        onError: (err) => {
          message.error("You might miss to edit something ");
          console.log(err);
        },
      }
    );
  };

  const defaultFileList: UploadFile[] = [
    {
      uid: "-1",
      status: "done",
      url: singleData?.image || undefined,
    },
  ];

  const AttributeId = singleData?.attributes?.map((item: any) => item.id);
  const valueId = singleData?.attributes?.map((item: any) =>
    item.values.map((subItem: any) => subItem.id)
  );
  const submitAttributeData = (values: any) => {
    console.log("dataaaaaaaaaaaaaaaaaaaaaaa", values);
    const processedAttributes = [
      ...values?.attributes?.map(
        (item: AttributeValuesType, index: number) => ({
          attribute_id: AttributeId[index] ?? null,
          title: item.title,
          values: item.values?.map((subItem, subIndex) => ({
            value: subItem.value,
            value_id: valueId[index]?.[subIndex] ?? null,
          })),
        })
      ),
    ];
    editAttribute(
      { attributes: processedAttributes, category_id: singleData.id },
      {
        onSuccess: () => {
          message.success("Attributes updated successfully!");
          navigate("/app/sub-category-list");
        },
        onError: (err) => {
          message.error("Failed to update attributes!");
          console.error("errorasdasd", err);
        },
      }
    );
  };

  //////////////////////
  return (
    <>
      <Tabs
        defaultActiveKey="1"
        items={[
          {
            key: "1",
            label: "Edit Category",
            children: (
              <ReusableForm
                submit={submit}
                data={singleData}
                isLoading={isLoading}
                defaultFileList={defaultFileList}
              />
            ),
          },
          {
            key: "2",
            label: "Edit Sub Category",
            children: (
              <AttributeForm
                submit={submitAttributeData}
                data={singleData}
                isLoading={isLoading}
              />
            ),
          },
        ]}
      ></Tabs>
    </>
  );
};
