import { MailReaderType } from './mail.reader.type';

export interface IMailParser {
  read(): Promise<void>;
}
