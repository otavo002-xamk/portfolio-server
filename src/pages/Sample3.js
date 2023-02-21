import React from "react";
import { LanguageContext } from "../language-context";

function Sample3() {
  return (
    <LanguageContext.Consumer>
      {({ language }) => (
        <div className="p-12 lg:p-0">
          <h1 className="text-2xl">{language.pages.sample3.title}</h1>
        </div>
      )}
    </LanguageContext.Consumer>
  );
}

export default Sample3;
