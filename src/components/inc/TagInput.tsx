import React from "react";
import * as AccessibleIcon from "@radix-ui/react-accessible-icon";
import { Flex } from "@components/base";
import { CancelIcon } from "@components/icons";
import { styled } from "stitches.config";

const Tag = styled("div", {
  br: "$pill",
  pl: "$2",
  pr: "$1",
  py: "$1",
  bg: "$bg",
  fontSize: "$xs",
  display: "flex",
  ai: "center",
  gap: "$1",
});

const CancelButton = styled("button", {
  appearance: "none",
  border: "none",
  padding: "$1",
  bg: "rgba($textRGB,0.2)",
  br: "$pill",
  display: "grid",
  placeItems: "center",
  color: "$text",
  fontSize: "$xs",
});
const Input = styled("input", {
  appearance: "none",
  bg: "transparent",
  outline: "none",
  py: 5,
  flex: 1,
  width: "min(50%,100px)",
  maxWidth: 150,
  border: "none",
  borderBottom: "2px solid rgba($textRGB,0.5)",
  transition: "all 100ms ease-in-out",
  color: "$text",
  "&:focus": {
    borderBottom: "2px solid rgba($textRGB,1)",
  },
});
const TagInput = () => {
  const [tags, setTags] = React.useState<string[]>(["nature"]);
  const onEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === " " && e.currentTarget.value.trim()) {
      console.log("Enter key pressed");
      setTags([...tags, e.currentTarget.value.trim()]);
      e.currentTarget.value = "";
    }
  };
  const deleteTag = (tagName: string) => {
    setTags((tags) => tags.filter((tag) => tag != tagName));
  };
  return (
    <Flex gap="1" css={{ mb: 20 }} wrap="wrap">
      {tags.map((tag, index) => (
        <Tag key={index}>
          {tag}
          <CancelButton onClick={() => deleteTag(tag)}>
            <AccessibleIcon.Root label="delete tag">
              <CancelIcon css={{ size: 10 }} />
            </AccessibleIcon.Root>
          </CancelButton>
        </Tag>
      ))}
      <Input type="text" onKeyDown={(e) => onEnterPress(e)} />
    </Flex>
  );
};

export default TagInput;
