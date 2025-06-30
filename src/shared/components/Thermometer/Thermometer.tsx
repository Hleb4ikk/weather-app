import styles from "./Thermometer.module.css";
import { Thermometer as ThermometerIcon } from "lucide-react";

export const Thermometer = ({ temp, size }: { temp: number; size: number }) => {
  return (
    <ThermometerIcon
      className={`${styles.thermometer} ${
        temp < -15 || temp > 35 ? styles.shake : ""
      }`}
      size={size}
    />
  );
};
