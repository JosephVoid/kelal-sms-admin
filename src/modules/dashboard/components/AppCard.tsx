import { Card, Separator, Spacer } from "@chakra-ui/react";
import { IAppCard } from "../types";
import TimeChart from "./TimeChart";
import DeliveryPieChart from "./DeliveryPieChart";
import MiniTable from "./MiniTable";
import { fetchMsgTimeAction } from "../lib/actions/fetchMsgTime.action";
import { fetchMsgStatusAction } from "../lib/actions/fetchMsgStatus.action";

export default async function AppCard(props: IAppCard) {
  const timeChart = await fetchMsgTimeAction(props.appId);
  const statusChart = await fetchMsgStatusAction(props.appId);

  return (
    <div className="!mb-4">
      <Card.Root>
        <Card.Body>
          <Card.Title>{props.name}</Card.Title>
          <div className="w-full flex !p-3">
            <div className="w-1/2">
              <TimeChart data={timeChart} />
            </div>
            <div className="w-1/2">
              <DeliveryPieChart data={statusChart} />
            </div>
          </div>
        </Card.Body>
      </Card.Root>
    </div>
  );
}
