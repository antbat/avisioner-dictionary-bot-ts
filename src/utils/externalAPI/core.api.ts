import { CoreApiAVisioner } from '@antbat/avisioner-core-api';
import { signedInData } from './auth.api';
import { config } from "../config";

const token = signedInData.then( e => e.token);

export const coreService = new CoreApiAVisioner(config.core.api, token);
