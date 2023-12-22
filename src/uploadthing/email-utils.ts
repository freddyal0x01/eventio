import { TokenType } from "db";
import { URL_ORIGIN } from "src/config";
import { regenerateToken } from "src/utils/blitz-utils";

export const generateUnsubscribeLink = async ({ userId, userEmail }) => {
  const token = await regenerateToken({
    tokenType: TokenType.UNSUBSCRIBE_EMAIL,
    userId,
    userEmail,
    expiryHours: 48,
    deleteExisting: false,
  });

  let unsubscribeLink = `${URL_ORIGIN}/unsubscribe?token=${token}`;

  return unsubscribeLink;
};
