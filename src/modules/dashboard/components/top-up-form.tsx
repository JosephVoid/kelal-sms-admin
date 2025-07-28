"use client";

import { Field, Input, Text } from "@chakra-ui/react";
import React, { ChangeEvent } from "react";
import { Alert } from "@chakra-ui/react";
import { useAsync } from "@/utils/useAsync";
import { requestTopupAction } from "@/modules/admin/lib/actions/request-topup.action";
import { toast } from "sonner";
import { FaCheck } from "react-icons/fa";
import Spinner from "@/components/shared/spinner";

export default function TopUpForm({
  onFinish,
  accountId,
}: {
  onFinish: () => void;
  accountId?: string;
}) {
  const [topupForm, setTopupForm] = React.useState({
    name: "",
    amount: 0,
    transactionId: "",
  });

  const { run, loading } = useAsync(requestTopupAction);

  async function handleSubmit(e: React.FormEvent) {
    if (!accountId) return;

    e.preventDefault();
    const result = await run({
      accountId: accountId,
      amount: Number(topupForm.amount),
      userName: topupForm.name,
      txnId: topupForm.transactionId,
    });
    if (result.success) {
      toast("Top Up Requested, We'll get back to you soon", {
        icon: <FaCheck />,
      });
      setTopupForm({
        name: "",
        amount: 0,
        transactionId: "",
      });
    } else {
      toast(result.error);
    }
  }

  async function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setTopupForm({ ...topupForm, [e.target.name]: e.target.value });
  }

  return (
    <div className="p-5 flex flex-col gap-4">
      <Text fontSize={"2xl"} fontWeight={"bold"}>
        Request Top Up
      </Text>
      <Alert.Root status="info" colorPalette="gray">
        <Alert.Indicator />
        <Alert.Content>
          <Text fontSize={"xs"}>
            To request a top up send the amount you need to the following CBE
            account <b>1000196349468 (YOSEPH TENAW ANDUALEM)</b>
          </Text>
          <Text fontSize={"xs"}>
            The send the name of the person that transferd it, the amount and
            the transaction Id on the below form.{" "}
          </Text>
        </Alert.Content>
      </Alert.Root>
      <div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Field.Root>
            <Field.Label>Transfer By</Field.Label>
            <Input
              variant={"outline"}
              placeholder="Enter the name on the receipt"
              value={topupForm.name}
              onChange={handleChange}
              name="name"
            />
          </Field.Root>
          <Field.Root>
            <Field.Label>Amount Transfered</Field.Label>
            <Input
              variant={"outline"}
              placeholder="Enter Amount"
              type="number"
              value={topupForm.amount}
              onChange={handleChange}
              name="amount"
            />
          </Field.Root>
          <Field.Root>
            <Field.Label>Transaction ID</Field.Label>
            <Input
              variant={"outline"}
              placeholder="Enter the transaction ID on the receipt"
              value={topupForm.transactionId}
              onChange={handleChange}
              name="transactionId"
            />
          </Field.Root>
          <button
            type="submit"
            className="!bg-black !text-white !rounded !p-3 !cursor-pointer"
            disabled={loading}
          >
            {loading ? <Spinner /> : "Request Topping Up"}
          </button>
        </form>
      </div>
    </div>
  );
}
