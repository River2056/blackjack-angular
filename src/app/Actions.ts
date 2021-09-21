import { Card } from "./Card";

export interface Actions {
  actionType: string;
  card: Card | null;
}
