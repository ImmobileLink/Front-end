"use client";

import { createContext, useContext, Dispatch, SetStateAction, useState } from "react";

type userDataType = {
  id?: string;
  identificador?: string;
  premium?: boolean;
  role?: number;
  links?: {
    id: string;
    nome: string;
  }[];
  associados?:
  {
    id: string;
    nome: string;
  }[];
};


const initialState: userDataType = {
  id: undefined,
  identificador: undefined,
  premium: undefined,
  role: undefined,
  links: [],
  associados: []
};
