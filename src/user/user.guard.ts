import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { CognitoJwtVerifier } from 'aws-jwt-verify';
import { CognitoJwtVerifierSingleUserPool } from 'aws-jwt-verify/cognito-verifier';

@Injectable()
export class CognitoGuard implements CanActivate {
  private readonly verifier: CognitoJwtVerifierSingleUserPool<{
    userPoolId: string;
    clientId: string;
    tokenUse: 'access';
  }>;
  constructor() {
    if (!process.env.COGNITO_USER_POOL_ID) {
      throw new Error('COGNITO_USER_POOL_ID environment variable was not set');
    }

    if (!process.env.COGNITO_CLIENT_ID) {
      throw new Error('COGNITO_CLIENT_ID environment variable was not set');
    }

    this.verifier = CognitoJwtVerifier.create({
      userPoolId: process.env.COGNITO_USER_POOL_ID,
      clientId: process.env.COGNITO_CLIENT_ID,
      tokenUse: 'access',
    });
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers?.authorization;
    if (!token) {
      return false;
    }

    try {
      const result = await this.verifier.verify(token);
      console.log(result);
      return !!result?.username;
    } catch (err) {
      return false;
    }
  }
}
