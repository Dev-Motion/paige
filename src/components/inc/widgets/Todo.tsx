import {
  Box,
  Card,
  Dropdown,
  Flex,
  IconButton,
  Popover,
  Text,
  Badge,
  Button,
} from "@components/base";
import { AddIcon, AlarmIcon, MoreIcon, StarIcon } from "@components/icons";
import useStore from "@store";
import * as React from "react";
import DatePicker from "../DatePicker";
import TodoItem, { Input } from "../TodoItem";
import { shallow } from "zustand/shallow";
import { TodoIcon } from "@components/icons";
import "../../../styles/scrollbar.css";
import { withTour } from "@components/base/Tour";
function TodoPane() {
  const [todos, toggleAll, clearCompleted] = useStore(
    (state) => [state.todos, state.toggleAll, state.clearCompleted],
    shallow,
  );
  const completedTodos = todos.filter((todo) => todo.completed);
  const activeTodos = todos.filter((todo) => !todo.completed);
  const orderedActiveTodos = activeTodos.sort((a) => {
    if (a.important) return -1;
    return 0;
  });

  return (
    <Flex fd="column" gap="1" css={{ width: 330, maxHeight: "80vh" }}>
      <Card
        nested
        as={Flex}
        jc="between"
        ai="center"
        css={{ pd: "$2", width: "100%" }}
      >
        <Text fw="medium">Todos</Text>
        <Dropdown>
          <Dropdown.Button asChild>
            <IconButton bg="transparent" size="xs">
              <MoreIcon />
              <Text srOnly>more options</Text>
            </IconButton>
          </Dropdown.Button>
          <Dropdown.Menu side="top">
            <Dropdown.MenuItem onClick={toggleAll}>
              Mark all as completed
            </Dropdown.MenuItem>
            <Dropdown.MenuItem onClick={clearCompleted}>
              Clear completed
            </Dropdown.MenuItem>
          </Dropdown.Menu>
        </Dropdown>
      </Card>
      <Box
        css={{
          flex: 1,
        }}
        className="custom-scroll-bar"
      >
        <Flex fd="column" gap="1">
          {[...orderedActiveTodos, ...completedTodos].map((todo) => (
            <TodoItem key={todo.id.toString()} todo={todo} />
          ))}
        </Flex>
      </Box>
      <AddTodo />
    </Flex>
  );
}

interface addTodoState {
  text: string;
  showInput: boolean;
  important: boolean;
  dateTime: Date | null;
}
function addTodoReducer(
  state: addTodoState,
  action: Partial<addTodoState> | ((state: addTodoState) => addTodoState),
): addTodoState {
  if (typeof action === "function") {
    return { ...state, ...action(state) };
  }
  return { ...state, ...action };
}

function AddTodo() {
  const [{ text, showInput, important, dateTime }, setState] = React.useReducer(
    addTodoReducer,
    {
      text: "",
      showInput: false,
      important: false,
      dateTime: null,
    },
  );
  const addTodo = useStore((state) => state.addTodo);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const handleAddTodo = () => {
    if (dateTime) {
      addTodo({
        id: Math.floor(Math.random() * 1000),
        text,
        completed: false,
        important,
        reminder: true,
        date: dateTime,
      });
    } else {
      addTodo({
        id: Math.floor(Math.random() * 1000),
        text,
        completed: false,
        important,
        reminder: false,
      });
    }
  };
  const onEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && text) {
      handleAddTodo();
      setState({ showInput: false, text: "", important: false });
    }
  };

  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [showInput]);
  return (
    <Card nested css={showInput ? { py: "$2", px: "$2" } : {}}>
      {showInput ? (
        <Flex>
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
                  onChange={(d) => {
                    setState({ dateTime: d });
                    inputRef.current?.focus();
                  }}
                />
                <Popover.Close />
              </Popover.Content>
            </Popover>
            <IconButton
              bg="transparent"
              size="xs"
              onClick={() => setState({ important: !important })}
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
      ) : (
        <Flex
          as="button"
          css={{
            include: "buttonReset",
            color: "$text",
            width: "100%",
            py: "$2",
            px: "$2",
          }}
          ai="center"
          gap="2"
          onClick={() => setState({ showInput: true })}
        >
          <IconButton as="div" bg="transparent" size="xs">
            <AddIcon css={{ color: "$text" }} />
          </IconButton>
          <Text fs="sm" fw="medium">
            Add a to-do
          </Text>
        </Flex>
      )}
    </Card>
  );
}

function Todo() {
  const todos = useStore((state) => state.todos);
  const unCompletedTodos = todos.filter((todo) => !todo.completed);
  return (
    <Popover>
      <Popover.Button asChild>
        <Button
          size="sm"
          kind="ghost"
          css={{
            display: "flex",
            ai: "center",
            position: "relative",
          }}
        >
          <TodoIcon />
          <Text>Todo</Text>
          <Badge
            ping
            color="accent"
            hidden={unCompletedTodos.length === 0}
            css={{
              position: "absolute",
              top: 0,
              right: 0,
              transform: "translate(50%, -50%)",
            }}
          >
            {unCompletedTodos.length}
          </Badge>
        </Button>
      </Popover.Button>
      <Popover.Content>
        <TodoPane />
        <Popover.Close />
        <Popover.Arrow />
      </Popover.Content>
    </Popover>
  );
}

export default withTour(Todo, {
  name: "todo",
  title: "Todo",
  description:
    "Create your to-dos by clicking on this icon here. Set reminders for your to-dos to keep you focused",
});
