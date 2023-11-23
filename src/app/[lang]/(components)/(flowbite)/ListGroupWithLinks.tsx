'use client';

import { ListGroup } from 'flowbite-react';

interface ListGroupWithLinks {
  items: {
    label: string;
    href: string;
  }[];
}

export default function ListGroupWithLinks({ items } : ListGroupWithLinks) {
  return (
    <ListGroup>
      {
        items.map(item => <ListGroup.Item key={item.href} href={"/" + item.href}>{item.label}</ListGroup.Item>)
      }
    </ListGroup>
  )
}


