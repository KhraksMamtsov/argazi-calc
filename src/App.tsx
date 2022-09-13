import React, { useState } from "react";
import "./App.css";
import { useStore } from "effector-react";
import * as $ from "./store/Calculator";
import { Course } from "./Course";

export default function App() {
  const course = useStore($.course$);

  return (
    <div className="App">
      <Course course={course} />
    </div>
  );
}
