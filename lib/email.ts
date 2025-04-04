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
  textPart?: string;
  htmlPart?: string;
}

interface Email {
  fromName: string | undefined;
  fromEmail: string | undefined;
  send: (props: SendProps) => Object | Error;
}

class MailJet implements Email {
  fromName;
  fromEmail;
  constructor(fromName?: string, fromEmail?: string) {
    this.fromName = fromName;
    this.fromEmail = fromEmail;
  }
  send(props: SendProps) {
    return {};
  }
}
