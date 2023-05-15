import {
  Card,
  CheckBox,
  Dropdown,
  Flex,
  IconButton,
  Text,
} from "@components/base";
import { AlarmIcon, More, StarIcon } from "@components/icons";
import { motion } from "framer-motion";
import useStore from "@store";
import { Todo } from "@store/slices/todoSlice";
import * as React from "react";
import { styled } from "stitches.config";

function TodoItem({ todo }: { todo: Todo }) {
  const [toggleTodo, editTodo, toggleImportant] = useStore((state) => [
    state.toggleTodo,
    state.editTodo,
    state.toggleImportant,
  ]);
  const [text, setText] = React.useState(todo.text);
  const [isEditing, setIsEditing] = React.useState(false);
  const [show, setShow] = React.useState(false);

  const toggleEditing = () => {
    setIsEditing((prev) => !prev);
  };
  const onEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      editTodo(todo.id, text);
      toggleEditing();
      setText("");
    }
  };
  return (
    <Card
      as={motion.div}
      layoutId={todo.id.toString()}
      // key={todo.id}
      data-option-open={show}
      css={{
        display: "flex",
        gap: "$2",
        ai: "center",
        width: "100%",
        py: "$3",
        px: "$2",
        "&:hover": {
          ".options": {
            transform: "translateY(-50%) translateX(0)",
          },
        },
        "&[data-option-open = 'true']": {
          ".options": {
            transform: "translateY(-50%) translateX(0)",
          },
        },
        position: "relative",
        overflow: "hidden",
      }}
    >
      <CheckBox
        checked={todo.completed}
        onCheckedChange={() => toggleTodo(todo.id)}
      />
      {isEditing ? (
        <Input
          value={text}
          onChange={(e) => setText(e.currentTarget.value)}
          onKeyDown={onEnter}
          ref={(e) => e?.focus()}
        />
      ) : (
        <Text
          fs="sm"
          css={{
            textDecoration: todo.completed ? "line-through" : "none",
            flex: 1,
          }}
        >
          {todo.text}
        </Text>
      )}
      <Flex
        ai="center"
        className="options"
        css={{
          position: "absolute",
          overflow: "hidden",
          top: "50%",
          right: 0,
          transform: "translateY(-50%) translateX(50%)",
          transition: "all .3s ease-in-out",
        }}
      >
        <IconButton
          size="sm"
          bg="transparent"
          onClick={() => toggleImportant(todo.id)}
        >
          <StarIcon
            css={{
              size: "$4",
              fill: todo.important ? "$text" : "none",
              color: "$text",
            }}
          />
        </IconButton>
        <Dropdown open={show} onOpenChange={setShow} key={todo.id}>
          <Dropdown.Button asChild>
            <IconButton
              size="sm"
              bg="transparent"
              onClick={() => setShow(true)}
              css={{}}
            >
              <More css={{ size: "$3", color: "$text" }} />
              <Text css={{ include: "screenReaderOnly" }}>more options</Text>
            </IconButton>
          </Dropdown.Button>
          <Dropdown.Menu>
            <TodoItemOptions
              id={todo.id}
              toggleEdit={() => {
                toggleEditing();
                setShow(false);
              }}
            />
          </Dropdown.Menu>
        </Dropdown>
      </Flex>
    </Card>
  );
}
function TodoItemOptions({
  id,
  toggleEdit,
}: {
  id: number;
  toggleEdit: () => void;
}) {
  const [removeTodo] = useStore((state) => [state.removeTodo]);
  return (
    <>
      <Dropdown.MenuItem>
        <MenuButton onClick={() => toggleEdit()}>
          <AlarmIcon /> <Text fs="sm">Edit</Text>
        </MenuButton>
      </Dropdown.MenuItem>
      <Dropdown.MenuItem>
        <MenuButton onClick={() => removeTodo(id)}>
          <AlarmIcon /> <Text fs="sm">Delete</Text>
        </MenuButton>
      </Dropdown.MenuItem>
      <Dropdown.MenuItem>
        <MenuButton>
          <AlarmIcon /> <Text fs="sm">set reminder</Text>
        </MenuButton>
      </Dropdown.MenuItem>
    </>
  );
}

export const Input = styled("input", {
  flex: 1,
  border: "none",
  outline: "none",
  fontSize: "$sm",
  bg: "transparent",
  color: "$text",
  "&:focus": {
    outline: "none",
  },
});
export default TodoItem;

export const MenuButton = styled("button", {
  include: "buttonReset",
  color: "$text",
  display: "flex",
  gap: "$1",
  ai: "center",
  fontSize: "$sm",
  fontWeight: "$medium",
  br: "$2",
  py: 2,
  px: 5,
  width: "100%",
  textAlign: "left",
  "&:hover": {
    bg: "rgba($textRGB, 0.1)",
  },
  "& svg": {
    size: "$3",
  },
});
