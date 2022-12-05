import React from "react";
import { Box } from "@mui/material";
import styles from "./App.Styles";
import ReactTouchSlide from "./ReactTouchSlide";

interface ReactSlideItem {
  name: string;
}

function App() {
  const [items, setItems] = React.useState<ReactSlideItem[]>([
    {
      name: "Dale"
    },
    {
      name: "Luke"
    },
    {
      name: "Monty"
    },
    {
      name: "Joseph"
    },
    {
      name: "Jitu"
    }
  ]);

  return (
    <Box className={[styles.root]}>
      <Box maxWidth="500px" margin="0 auto">
        {items.map(({ name }, index) => (
          <ReactTouchSlide key={name} className={styles.item} onReachThreshold={()=>{
            console.log('Deleting:: ', index);
              const itemsCp = [...items];
              const [deleted] = itemsCp.splice(index,1);
              setItems([...itemsCp, deleted]);
          }}>
            {name}
          </ReactTouchSlide>
        ))}
      </Box>
    </Box>
  );
}

export default App;
