import { Form, Input, Flex, Typography, Button } from "antd";
import React, { useState } from "react";
import { useDebounce } from "../../Config/useDebaunce";
import { useSearchProductVariant } from "../../Service/Query/useSearchProductVariant";
import { Link } from "react-router-dom";
interface TypeofSearchVariants {
  SearchProductVariantId: number | any;
  SearchID: string | undefined;
}
export const ProductVariantSearch: React.FC<TypeofSearchVariants> = ({
  SearchProductVariantId,
  SearchID,
}) => {
  const [input, setInput] = useState("");
  const debounceValue = useDebounce(input);
  const { data } = useSearchProductVariant(debounceValue);
  const DATADETAIL = data?.results || [];
  const DATAID = DATADETAIL.filter((item: any) => {
    return SearchProductVariantId.some((id: number) => item.id === id);
  });

  const datadata = DATAID?.map((item: number | any) => item.id);
  interface SearchType {
    key: number;
    id: number;
    image: string;
    title: string;
  }

  return (
    <Form style={{ position: "relative" }}>
      <Form.Item>
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Search..."
        />
      </Form.Item>
      {data?.results?.map((item: SearchType) => (
        <div key={item.id} style={{ position: "relative" }}>
          <Flex
            key={item.id}
            align="center"
            gap={"20px"}
            style={{
              zIndex: 300,
              background: "#c2b6b6",
              boxShadow: `rgba(0, 0, 0, 0.35) 0px 5px 15px`,
              width: "100%",
              padding: "20px",
              borderRadius: "20px",
              position: "absolute",
            }}
          >
            <Link to={`/app/product/variants/${SearchID}/${datadata}/images`}>
              <Button variant="solid" type="primary" onClick={() => datadata}>
                Show Added Images
              </Button>
            </Link>

            <Typography.Title level={3}>{item.title}</Typography.Title>
          </Flex>
        </div>
      ))}
    </Form>
  );
};
