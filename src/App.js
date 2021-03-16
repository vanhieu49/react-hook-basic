import { useEffect, useState } from "react";
import "./App.scss";
import QueryString from "query-string";

// import BoxColor from "./component/BoxColor";
import TodoList from "./component/TodoList";
import TodoForm from "./component/TodoForm";
import PostList from "./component/PostList";
import Pagination from "./component/Pagination";
import SearchForm from "./component/SearchForm";
import Clock from "./component/Clock";

function App() {
  const [todoList, setTodoList] = useState([
    { id: 1, title: "react 1" },
    { id: 2, title: "react 2" },
    { id: 3, title: "react 3" },
  ]);
  const [postList, setPostList] = useState([]);
  const [pagination, setPagination] = useState({
    _page: 4,
    _limit: 10,
    _totalRows: 3,
  });

  const [filters, setFilters] = useState({
    _limit: 10,
    _page: 1,
    title_like: "",
  });

  useEffect(() => {
    async function fetchPostList() {
      try {
        const paramsString = QueryString.stringify(filters);
        const requestURL = `http://js-post-api.herokuapp.com/api/posts?${paramsString}`;
        const response = await fetch(requestURL);
        const responseJSON = await response.json();
        const { data, pagination } = responseJSON;
        setPostList(data);
        setPagination(pagination);
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchPostList();
  }, [filters]);

  function handleClick(todo) {
    const index = todoList.findIndex((x) => (x.id = todo.id));

    if (index < 0) return;

    const newTodoList = [...todoList];
    newTodoList.splice(index, 1);

    setTodoList(newTodoList);
  }
  function handlOnSubmit(formdata) {
    const todo = {
      id: todoList.length + 1,
      ...formdata,
    };
    const newTodoList = [...todoList];
    newTodoList.push(todo);
    setTodoList(newTodoList);
  }
  function handlePageChange(newPage) {
    setFilters({
      ...filters,
      _page: newPage,
    });
  }
  function handleSearchForm(searchTerm) {
    console.log(searchTerm);
    setFilters({
      ...filters,
      _page: 1,
      title_like: searchTerm.searchTerm,
    });
  }
  const [showClock, setShowClock] = useState(true);

  return (
    <div className="App">
      <h1>React Todolist Post List</h1>
      {showClock && <Clock />}
      <button onClick={() => setShowClock(false)}>Hidden</button>
      {/* <TodoForm onsubmit={handlOnSubmit} /> */}
      {/* <TodoList todos={todoList} onTodoClick={handleClick} /> */}
      {/* <SearchForm onSubmit={handleSearchForm} />
      <PostList posts={postList} />
      <Pagination pagination={pagination} onPageChange={handlePageChange} /> */}
    </div>
  );
}

export default App;
