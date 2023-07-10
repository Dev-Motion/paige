import {
  Card,
  CheckBox,
  Dropdown,
  Flex,
  IconButton,
  Popover,
  Text,
  Box,
} from "@components/base";
import {
  AlarmIcon,
  DeleteIcon,
  EditIcon,
  MoreIcon,
  StarIcon,
} from "@components/icons";
import useStore from "@store";
import { Todo } from "@store/slices/todoSlice";
import { analyzeDate } from "@utils";
import { motion } from "framer-motion";
import * as React from "react";
import { styled } from "stitches.config";
import { shallow } from "zustand/shallow";
import DatePicker from "./DatePicker";

interface todoItemState {
  text: string;
  isEditing: boolean;
  important: boolean;
  dateTime?: Date;
}
function todoItemReducer(
  state: todoItemState,
  action:
    | Partial<todoItemState>
    | ((state: todoItemState) => Partial<todoItemState>)
): todoItemState {
  if (typeof action === "function") {
    return { ...state, ...action(state) };
  }
  return { ...state, ...action };
}

function TodoItem({ todo }: { todo: Todo }) {
  const [toggleTodo, editTodo, toggleImportant, setTodoDate] = useStore(
    (state) => [
      state.toggleTodo,
      state.editTodo,
      state.toggleImportant,
      state.setTodoDate,
    ],
    shallow
  );
  const [{ text, isEditing, important, dateTime }, setState] = React.useReducer(
    todoItemReducer,
    {
      text: todo.text,
      isEditing: false,
      important: todo.important,
      dateTime: todo.reminder ? new Date(todo.date) : undefined,
    }
  );
  const [show, setShow] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const toggleEditing = () => {
    setState((prev) => ({ isEditing: !prev.isEditing }));
  };
  const onEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && text) {
      editTodo(todo.id, text);
      if (dateTime) {
        setTodoDate(todo.id, dateTime);
      }
      if (todo.important !== important) {
        toggleImportant(todo.id);
      }
      toggleEditing();
    }
  };

  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);
  return (
    <Card
      nested={true}
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
      {!isEditing ? (
        <>
          <CheckBox
            checked={todo.completed}
            onCheckedChange={() => toggleTodo(todo.id)}
          />
          <Flex fd="column" gap="1" css={{ flex: 1 }}>
            <Text fs="sm">
              <AnimatedText lineThrough={todo.completed}>
                {todo.text}
              </AnimatedText>
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
          <Flex
            ai="center"
            className="options"
            css={{
              pd: "$1",
              position: "absolute",
              overflow: "hidden",
              top: "min(50%,23px)",
              right: 0,
              transform: "translateY(-50%) translateX(50%)",
              transition: "all .3s ease-in-out",
              br: "$pill",
              bg: "radial-gradient(circle, rgba($bgRGB,1) 0%, rgba($bgRGB,1) 0%, rgba($bgRGB,0.8) 30%, rgba($bgRGB,0.7) 50%, rgba($bgRGB,0.5) 60%, rgba($bgRGB,0) 100%)",
              "&:focus-within": {
                transform: "translateY(-50%) translateX(0)",
              },
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
                <IconButton size="sm" bg="transparent" css={{}}>
                  <MoreIcon css={{ size: "$3", color: "$text" }} />
                  <Text css={{ include: "screenReaderOnly" }}>
                    more options
                  </Text>
                </IconButton>
              </Dropdown.Button>
              <Dropdown.Menu>
                <TodoItemOptions
                  id={todo.id}
                  toggleEdit={() => {
                    toggleEditing();
                  }}
                />
              </Dropdown.Menu>
            </Dropdown>
          </Flex>
        </>
      ) : (
        <Flex css={{ width: "100%" }}>
          <Input
            value={text}
            onChange={(e) => setState({ text: e.currentTarget.value })}
            onKeyDown={onEnter}
            ref={inputRef}
            css={{ flex: 1, pl: "$2" }}
          />
          <Flex>
            <Popover>
              <Popover.Button asChild>
                <IconButton bg="transparent" size="xs">
                  <AlarmIcon css={{ size: "$3", color: "$text" }} />
                </IconButton>
              </Popover.Button>
              <Popover.Content>
                <DatePicker
                  date={dateTime}
                  onChange={(dateTime) => {
                    setState({ dateTime });
                    inputRef.current?.focus();
                  }}
                />
                <Popover.Close />
              </Popover.Content>
            </Popover>
            <IconButton
              bg="transparent"
              size="xs"
              onClick={() =>
                setState((state) => ({
                  important: !state.important,
                }))
              }
            >
              <StarIcon
                css={{
                  size: "$3",
                  fill: important ? "$text" : "transparent",
                  transition: "all 300ms ease-in-out",
                  color: "$text",
                }}
              />
            </IconButton>
          </Flex>
        </Flex>
      )}
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

const AnimatedText = styled("span", {
  textDecoration: "none",
  backgroundImage: "linear-gradient($text, $text)",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center left",
  backgroundSize: "0% 1px",
  transition: "background-size 500ms ease-in-out",
  variants: {
    lineThrough: {
      true: {
        backgroundSize: "100% 1px",
        textDecoration: "line-through",
        textDecorationColor: "transparent",
      },
    },
  },
});
export default TodoItem;
