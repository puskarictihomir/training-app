import React from "react";

import { Box } from "@chakra-ui/react";

const TrainingForm = () => {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch("http://localhost:4001/api")
      .then((res) => {
        return res.json();
      })
      .then((data) => setData(data.message));
  }, [data]);

  return <Box>{!data ? "Loading..." : data}</Box>;
};

export default TrainingForm;
