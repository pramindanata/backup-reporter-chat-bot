import { injectable } from 'tsyringe';
import { BaseConfig } from '@/core/config';

@injectable()
export class AdapterConfig extends BaseConfig<ConfigKeyDict> {
  protected props: Record<string, any>;

  constructor() {
    super();

    const { env } = process;

    this.props = {
      backupReportLogAuthToken: env.BACKUP_REPORT_LOG_AUTH_TOKEN || '',
    };
  }
}

interface ConfigKeyDict {
  backupReportLogAuthToken: string;
}
