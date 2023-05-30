import {
  Card,
  CheckBox,
  Dropdown,
  Flex,
  IconButton,
  Text,
} from "@components/base";
import {
  AlarmIcon,
  DeleteIcon,
  EditIcon,
  More,
  StarIcon,
} from "@components/icons";
import { motion } from "framer-motion";
import useStore from "@store";
import { Todo } from "@store/slices/todoSlice";
import * as React from "react";
import { styled } from "stitches.config";
import { analyzeDate } from "@utils";

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
    if (e.key === "Enter" && text) {
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
        ai: "start",
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
        <Flex fd="column" gap="1" css={{ flex: 1 }}>
          <Text
            fs="sm"
            css={{
              textDecoration: todo.completed ? "line-through" : "none",
            }}
          >
            {todo.text}
          </Text>
          {todo.reminder && (
            <Flex
              css={{
                border: "0.3px solid $text",
                px: "$2",
                py: "$1",
                br: "$pill",
                gap: "$1",
                fontSize: "$2xs",
                width: "fit-content",
                color: "$text",
              }}
            >
              {analyzeDate(new Date(todo.date))}
            </Flex>
          )}
        </Flex>
      )}
      <Flex
        ai="center"
        className="options"
        css={{
          position: "absolute",
          overflow: "hidden",
          top: "min(50%,23px)",
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
      <Dropdown.MenuItem onClick={() => toggleEdit()}>
        <Flex gap="1" ai="center">
          <EditIcon css={{ size: "$3" }} /> <Text fs="sm">Edit to-do</Text>
        </Flex>
      </Dropdown.MenuItem>
      <Dropdown.MenuItem onClick={() => removeTodo(id)}>
        <Flex gap="1" ai="center">
          <DeleteIcon css={{ size: "$3" }} /> <Text fs="sm">Delete</Text>
        </Flex>
      </Dropdown.MenuItem>
      <Dropdown.MenuItem>
        <Flex gap="1" ai="center">
          <AlarmIcon css={{ size: "$3" }} /> <Text fs="sm">Set reminder</Text>
        </Flex>
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
