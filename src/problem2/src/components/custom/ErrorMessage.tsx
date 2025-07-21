import React from "react";

type Props = {
  children: React.ReactNode;
};

export default function ErrorMessage({ children }: Props) {
  return <p className="text-sm text-red-500 mt-1">{children}</p>;
}
