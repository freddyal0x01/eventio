export enum EmailList {
  Marketing = "marketing",
  Product = "product",
  All = "all",
}

export enum EmailTemplate {
  Dummy = "dummy",
  BlackFriday = "blackFriday",
}

export type VariableType = {
  id: string;
  key: string;
  value: string;
  isTextArea?: boolean;
};

export type SpecialVariables = {
  userName: string;
  userEmail: string;
  userId: string;
  userBio: string;
  userUsername: string;
  userAvatarImageKey: string;
};
