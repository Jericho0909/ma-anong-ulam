import type { ReactNode } from "react";

export interface Props {
    children: ReactNode;
}

export interface UlamItems {
    name: string;
    style: string;

}

export interface DataList<T> {
    data: T[];
}

export interface UlamTypes {
    id: number;
    name: string;
    description: string;
    ingredients: string[];
    optionalIngredients: string[];
    cookTime: number;
    difficulty: string;
    image: string;
}