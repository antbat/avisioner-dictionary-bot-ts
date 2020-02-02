import { config } from '../config';
import {AuthApiAVisioner, ISignInData} from '@antbat/avisioner-auth-api';

export const authService = new AuthApiAVisioner(config.auth.api);
export const signedInData = authService.signIn(config.auth.email, config.auth.password);
