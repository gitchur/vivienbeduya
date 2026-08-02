import { ComponentProps } from "react";
import FlightButtonsList from "@flight-digital/flightdeck/rocks/buttonsList";
import Link from "../atoms/link";

type DefaultProps = Omit<ComponentProps<typeof FlightButtonsList>, "LinkComponent">;

interface Props extends DefaultProps { }

const ButtonsList = (props: Props) => {
  return <FlightButtonsList {...props} LinkComponent={Link} />;
};

export default ButtonsList;
