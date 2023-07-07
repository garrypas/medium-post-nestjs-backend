import logger from '@app/logger';
import { Injectable } from '@nestjs/common';
import {
  CognitoJwtVerifier,
  CognitoJwtVerifierSingleUserPool,
} from 'aws-jwt-verify/cognito-verifier';

@Injectable()
export class UserService {
  private readonly verifier: CognitoJwtVerifierSingleUserPool<{
    userPoolId: string;
    clientId: string;
    tokenUse: 'access';
  }>;
  constructor() {
    if (!process.env.COGNITO_USER_POOL_ID) {
      logger.error('COGNITO_USER_POOL_ID environment variable was not set');
    }

    if (!process.env.COGNITO_CLIENT_ID) {
      logger.error('COGNITO_CLIENT_ID environment variable was not set');
    }

    this.verifier = CognitoJwtVerifier.create({
      userPoolId: process.env.COGNITO_USER_POOL_ID,
      clientId: process.env.COGNITO_CLIENT_ID,
      tokenUse: 'access',
    });
  }

  getUser(authToken: string) {
    return this.verifier.verify(authToken);
  }
}
