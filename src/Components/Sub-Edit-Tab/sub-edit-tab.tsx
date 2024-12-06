import { Tabs } from "antd";
import { ReusableForm } from "../Form";
import { useParams, useNavigate } from "react-router-dom";
import { useEditCategory } from "../../Service/Mutation/useEditCategory";
import { useGetSingleData } from "../../Service/Query/useGetSingleData";
import { FormDatas } from "../../Types/data-types";
import { message, UploadFile } from "antd";
import { AttributeForm } from "../Create-Attribute";
// import { useAttributeEdit } from "../../Service/Mutation/useAttributeEdit";

export const SubEditTab = () => {
  const { id } = useParams();
  const { data: singleData, isLoading } = useGetSingleData(id);

  const { mutate } = useEditCategory();
  const navigate = useNavigate();
  //   const { mutate: AtrributeEdit } = useAttributeEdit();

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

  //   const AtrributeSubmit = (attributeData: any) => {
  //     console.log("dataaaaaaa21uwrte", attributeData);

  //     // const NewEditedData = {
  //     //   attr_list: attributeData?.attributes?.map((item: AttrValue) => ({
  //     //     category: [id],
  //     //     title: item?.title,
  //     //     values: item?.values?.map((value: string | number | any) => id) || [],
  //     //   })),
  //     // };
  //     // console.log("newdataedited", NewEditedData);

  //     AtrributeEdit(
  //       { id, NewEditedData },
  //       {
  //         onSuccess: () => {
  //           message.success("attribute edited successfully");
  //           navigate("/app/sub-category-list");
  //         },
  //         onError: (err) => {
  //           console.log(err);
  //         },
  //       }
  //     );
  //   };

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
                // submit={AtrributeSubmit}
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
