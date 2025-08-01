import { Card } from "@/components/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/components/ui/tabs";

export default function CodeBox() {
  return (
    <Tabs defaultValue="node">
      <TabsList className="bg-transparent">
        <TabsTrigger value="node">Node.js</TabsTrigger>
        <TabsTrigger value="curl">cURL</TabsTrigger>
        <TabsTrigger value="python">Python</TabsTrigger>
        <TabsTrigger value="php">PHP</TabsTrigger>
      </TabsList>
      <TabsContent value="curl">
        <Card className="bg-black text-green-300 font-mono p-4 text-xs overflow-auto rounded-sm">
          <pre>
            <code>{`curl -X POST https://sms.kelal.et/otp/send \\
  -H "x-api-key: API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{ "appId": "APP_ID", "to": "+2519xxxxxxx", "otp": "000000" }'`}</code>
          </pre>
        </Card>
      </TabsContent>

      <TabsContent value="node">
        <Card className="bg-black text-green-300 font-mono p-4 text-xs overflow-auto rounded-sm">
          <pre>
            <code>{`const axios = require("axios");

axios.post("https://sms.kelal.et/otp/send", {
  appId: "APP_ID",
  to: "+2519xxxxxxx",
  otp: "000000"
}, {
  headers: {
    "x-api-key": "API_KEY"
  }
});`}</code>
          </pre>
        </Card>
      </TabsContent>
      <TabsContent value="python">
        <Card className="bg-black text-green-300 font-mono p-4 text-xs overflow-auto rounded-sm">
          <pre>
            <code>{`import requests

url = "https://sms.kelal.et/otp/send"
headers = {
  "x-api-key": "API_KEY",
  "Content-Type": "application/json"
}
data = {
  "appId": "APP_ID",
  "to": "+2519xxxxxxx",
  "otp": "000000"
}

response = requests.post(url, json=data, headers=headers)

print(response.status_code)
print(response.text)`}</code>
          </pre>
        </Card>
      </TabsContent>
      <TabsContent value="php">
        <Card className="bg-black text-green-300 font-mono p-4 text-xs overflow-auto rounded-sm">
          <pre>
            <code>{`<?php
require 'vendor/autoload.php';

use GuzzleHttp\\Client;

$client = new Client();

$response = $client->post('https://sms.kelal.et/otp/send', [
  'headers' => [
    'x-api-key' => 'API_KEY',
    'Content-Type' => 'application/json',
  ],
  'json' => [
    'appId' => 'APP_ID',
    'to' => '+2519xxxxxxx',
    'otp' => '000000',
  ]
]);

echo $response->getStatusCode();
echo $response->getBody();`}</code>
          </pre>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
