import React from "react";

export function Button(props) {
  return (
    <div>
      <button {...props}>{props.children}</button>
    </div>
  );
}
