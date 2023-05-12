import { CardContainer } from "@/styles/style";

type CardProps = {
  text: string;
};
export const Card = ({ text }: CardProps) => {
  return <CardContainer>{text}</CardContainer>;
};
