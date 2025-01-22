import { useParams } from "react-router-dom";
import { useAtrebutGetId } from "../hooks/useAtrebutGetId";
import { AttributeForm } from "./atrebute-form";
import { message } from "antd";
import { useAtrebutePatch } from "../hooks/useAtrebutePatch";

export const AtrebutEdite = () => {
  const { id } = useParams();
  const { data: attribute } = useAtrebutGetId(id);
  const { mutate: mutateAttribute } = useAtrebutePatch();
  console.log(attribute);

  const editAttributes = (values: any) => {
    const formattedData = {
      attr_list: values.items.map((item: any) => ({
        title: item.name,
        values: item.list.map((subItem: any) => subItem.first),
        category: [id],
      })),
    };

    mutateAttribute(formattedData, {
      onSuccess: () => {
        message.success("Attributes updated successfully!");
      },
      onError: (err) => {
        message.error("Failed to update attributes!");
        console.log(err);
      },
    });
  };
  return <AttributeForm onFinish={editAttributes} data={attribute} />;
};
