import React from "react";

import Card from "../Card";
import { MdAdd } from "react-icons/md";

import { Container } from "./styles";

export default function List({ data, index: listIndex }) {
  return (
    <Container done={data.done}>
      <header>
        <h2>{data.title}</h2>
        {data.creatable && (
          <button type='button'>
            <MdAdd size={24} color='#fff' />
          </button>
        )}
      </header>

      <ul>
        {data.cards.map((card, index) => (
          <Card
            cardData={card}
            index={index}
            key={index}
            listIndex={listIndex}
          />
        ))}
      </ul>
    </Container>
  );
}
