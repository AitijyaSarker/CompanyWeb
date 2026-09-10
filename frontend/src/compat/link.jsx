import React from "react";

export default function Link({ href, children, ...props }) {
  return <a href={typeof href === "string" ? href : "#"} {...props}>{children}</a>;
}