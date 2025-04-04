"use server";

import MJ, { Client } from "node-mailjet";

interface SendProps {
  from?: {
    name?: string;
    email: string;
  };
  to: {
    name?: string;
    email: string;
  }[];
  templateId?: number;
  variables?: Record<string, string>;
  subject?: string;
  textBody?: string;
  htmlBody?: string;
}

interface Email<ClientType> {
  fromName: string | undefined;
  fromEmail: string | undefined;
  client: ClientType;
  send: (props: SendProps) => Promise<Object | Error>;
}

/**
 * MailJet API wrapped in a custom class to respect the dependency inversion principle.
 * If a new email service is used, try to make it implement the same
 * Email<ClientType> interface.
 */
class MailJet implements Email<Client> {
  fromName;
  fromEmail;
  client;
  constructor(fromName?: string, fromEmail?: string) {
    console.log("Api key", process.env.MJ_APIKEY_PUBLIC);
    const mailjet = MJ.apiConnect(
      process.env.MJ_APIKEY_PUBLIC!,
      process.env.MJ_APIKEY_PRIVATE!
    );
    this.fromName = fromName;
    this.fromEmail = fromEmail;
    this.client = mailjet;
  }
  send(props: SendProps) {
    const processedProps = {
      From: {
        Name: props.from?.name ?? this.fromName,
        Email: props.from?.email ?? this.fromEmail,
      },
      To: props.to.map((to) => ({
        Name: to.name,
        Email: to.email,
      })),
      TemplateID: props.templateId,
      Variables: props.variables,
      Subject: props.subject,
      TextPart: props.textBody,
      HTMLPart: props.htmlBody,
    };
    const response = this.client
      .post("send", { version: "v3.1" })
      .request({ Messages: [processedProps] });
    return response;
  }
}

const emailClient = new MailJet("Synthase Studio", "test@natemay.dev");

export async function sendEmail(props: SendProps) {
  return emailClient.send(props);
}
