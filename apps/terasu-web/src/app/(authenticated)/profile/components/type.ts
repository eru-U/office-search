export type Qualification = {
  id: string;
  name: string | null;
  obtainedDate: Date | null;
};

export type UserTech = {
  techStack: {
    id: string;
    name: string | null;
  };
  startedAt: Date | null; // years から変更
  note: string | null;
};

export type ProfileData = {
  name: string | null;
  email: string | null;
  image: string | null;
  createdAt: Date;
  qualifications: Qualification[];
  userTechs: UserTech[];
};

export type ProfileAvatarProps = {
  image: string | null;
  name: string | null;
};

export type ProfileInfoProps = {
  name: string | null;
  email: string | null;
  createdAt: Date;
};

export type ProfileQualificationsProps = {
  qualifications: Qualification[];
};

export type ProfileTechStackProps = {
  userTechs: UserTech[];
};
