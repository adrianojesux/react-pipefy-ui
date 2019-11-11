import React, { useRef, useContext } from "react";
import { useDrag, useDrop } from "react-dnd";

import { Container, Label } from "./styles";

import BoardContext from "../Board/context";

export default function Card({ cardData, index, listIndex }) {
  const ref = useRef();
  const { move } = useContext(BoardContext);

  const [{ isDraggin }, dragRef] = useDrag({
    item: {
      type: "CARD",
      listIndex,
      index
    },
    collect: monitor => ({
      isDraggin: monitor.isDragging()
    })
  });

  const [, dropRef] = useDrop({
    accept: "CARD",
    hover(item, monitor) {
      const draggedIndex = item.index;
      const targetIndex = index;

      const draggedListIndex = item.listIndex;
      const targetListIndex = listIndex;

      if (
        draggedIndex === targetIndex &&
        draggedListIndex === targetListIndex
      ) {
        return;
      }

      const targetSize = ref.current.getBoundingClientRect();
      const targetCenter = (targetSize.bottom - targetSize.top) / 2;

      const draggedOffset = monitor.getClientOffset();

      const draggedTop = draggedOffset.y - targetSize.top;

      if (draggedIndex < targetIndex && draggedTop < targetCenter) {
        return;
      }

      if (draggedIndex > targetIndex && dragRef > targetCenter) {
        return;
      }

      console.log(item.listIndex, listIndex);

      move(draggedListIndex, draggedIndex, targetIndex, targetListIndex);

      item.index = targetIndex;
      item.listIndex = targetListIndex;
    }
  });

  dragRef(dropRef(ref));

  return (
    <Container ref={ref} isDraggin={isDraggin}>
      <header>
        {cardData && cardData.labels.map(lb => <Label color={lb} key={lb} />)}
      </header>
      <p>{cardData && cardData.content}</p>
      {cardData && cardData.user && <img src={cardData.user} alt='' />}
    </Container>
  );
}
