import React from "react";
import { CommentSystem } from "./components/CommentSystem";

const App: React.FC = () => {
  console.log("App");
  return (
    <div className="App">
      <CommentSystem />
    </div>
  );
};

export default App;
