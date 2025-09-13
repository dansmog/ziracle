import styles from "./spinner.module.css";

interface ILoader {
  color?: string;
}
const Spinner = ({ color }: ILoader) => {
  const cstyle = {
    borderColor: `${color} ${color} ${color} transparent`,
  };

  return <div style={cstyle} className={styles.loader}></div>;
};

export default Spinner;
