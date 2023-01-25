import React from "react";

export const assertionDefaults = {
  nameType: true
};

function setter() {
  console.error('A setter should have been set');
}

export const AssertionsContext = React.createContext({
  assertions: assertionDefaults,
  setAssertions: setter
});
