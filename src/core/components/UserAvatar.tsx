import { Avatar, AvatarProps } from "@mantine/core";
import {
  getAvatarFallbackName,
  getUploadthingUrl,
} from "src/utils/image-utils";
import { ReactFC } from "types";

type Props = {
  user: {
    name?: string | null;
    avatarImageKey?: string | null;
  };
} & Partial<AvatarProps>;

export const UserAvatar: ReactFC<Props> = ({ user, ...any }) => {
  return (
    <Avatar src={getUploadthingUrl(user.avatarImageKey)} radius={"xl"} {...any}>
      {getAvatarFallbackName(user.name)}
    </Avatar>
  );
};
