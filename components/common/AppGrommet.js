import { Grommet } from "grommet";

const theme = {
  global: {
    font: {
      family: 'Roboto',
      size: '18px',
      height: '20px',
    },
  },
};

export default function AppGromet({ children }) {
  return <Grommet full theme={theme}>{children}</Grommet>
}
