/**
 * Core Contracts Token
 */
export const CT = {
  DomainEventContract: Symbol('DomainContractEvent'),
};

/**
 * Repo Contracts Token
 */
export const RT = {
  BackupReportLogRepositoryContract: Symbol(
    'BackupReportLogRepositoryContract',
  ),
  AccessTokenRepositoryContract: Symbol('AccessTokenRepositoryContract'),
  TelegramAccountRepositoryContract: Symbol(
    'TelegramAccountRepositoryContract',
  ),
};

/**
 * UOW Contract Token
 */
export const UT = {
  ActivateAccessTokenUOWContract: Symbol('ActivateAccessTokenUOWContract'),
};

/**
 * View Contracts Token
 */
export const VT = {
  SuccessBackupReportLogViewContract: Symbol(
    'SuccessBackupReportLogViewContract',
  ),
  FailedBackupReportLogViewContract: Symbol(
    'FailedBackupReportLogViewContract',
  ),
};

/**
 * Service Contracts Token
 */
export const ST = {
  TelegramServiceContract: Symbol('TelegramServiceContract'),
};
