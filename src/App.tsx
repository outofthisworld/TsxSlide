import { Box } from "@mui/material";
import styles from "./App.Styles";
import ReactTouchSlide from "./ReactTouchSlide";

interface ReactSlideItem {
  name: string;
}

function App() {
  const items: ReactSlideItem[] = [
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
  ];

  return (
    <Box className={[styles.root]}>
      {items.map(({ name }, index) => (
        <ReactTouchSlide key={name} className={styles.item}>
          {name}
        </ReactTouchSlide>
      ))}
    </Box>
  );
}

export default App;
