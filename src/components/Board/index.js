import React, { useState, useEffect } from "react";
import produce from "immer";

import { loadLists } from "../../services/api";
import BoardContext from "./context";

import List from "../List";
import { Container } from "./styles";

export default function Board() {
  const [lists, setLists] = useState([]);

  useEffect(() => {
    setLists(loadLists());
  }, []);

  function move(fromList, from, to, toList) {
    console.log("FROM LIST", fromList, "TO LIST =", toList);
    setLists(
      produce(lists, draft => {
        const dragged = draft[fromList].cards[from];
        draft[fromList].cards.splice(from, 1);
        draft[toList].cards.splice(to, 0, dragged);
      })
    );
  }

  return (
    <BoardContext.Provider value={{ lists, move }}>
      <Container>
        {lists.map((list, index) => (
          <List data={list} key={list.title} index={index} />
        ))}
      </Container>
    </BoardContext.Provider>
  );
}
