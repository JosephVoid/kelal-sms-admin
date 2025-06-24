import { Card, Separator, Spacer } from "@chakra-ui/react";
import { IAppCard } from "../types";
import TimeChart from "./TimeChart";
import DeliveryPieChart from "./DeliveryPieChart";
import MiniTable from "./MiniTable";

export default function AppCard(props: IAppCard) {
  return (
    <>
      <Card.Root>
        <Card.Body>
          <Card.Title>{props.name}</Card.Title>
          <div className="w-full flex">
            <div className="w-1/2">
              <TimeChart />
            </div>
            <div className="w-1/2">
              <DeliveryPieChart />
            </div>
          </div>
          <div>
            <MiniTable />
          </div>
        </Card.Body>
      </Card.Root>
    </>
  );
}
