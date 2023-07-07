import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { User } from '@user/user.types';
import { CognitoJwtVerifier } from 'aws-jwt-verify';

let verifier = null;
const getVerifier = () => {
  if (!verifier) {
    if (!process.env.COGNITO_USER_POOL_ID) {
      throw new Error('COGNITO_USER_POOL_ID environment variable was not set');
    }

    if (!process.env.COGNITO_CLIENT_ID) {
      throw new Error('COGNITO_CLIENT_ID environment variable was not set');
    }

    verifier = CognitoJwtVerifier.create({
      userPoolId: process.env.COGNITO_USER_POOL_ID,
      clientId: process.env.COGNITO_CLIENT_ID,
      tokenUse: 'access',
    });
  }
  return verifier;
};

export const CurrentUser = createParamDecorator(
  async (data: any, ctx: ExecutionContext): Promise<User> => {
    const request = ctx.switchToHttp().getRequest();
    const token = request.headers?.authorization;
    if (!token) {
      throw new Error(
        `authorization header undefined. This shouldn't happen. Ensure CognitoGuard is also applied.`,
      );
    }
    const payload = await getVerifier().verify(token);
    return {
      userId: payload.username,
    };
  },
);
