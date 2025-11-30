// Update this page (the content is just a fallback if you fail to update the page)

import React from "react";

const Index = () => {
  // Redirection vers Home pour accessibilité
  React.useEffect(() => {
    window.location.href = "/";
  }, []);

  return null;
};

export default Index;
