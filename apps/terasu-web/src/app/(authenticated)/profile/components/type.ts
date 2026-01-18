export type Qualification = {
  id: string;
  name: string | null;
  obtainedDate: Date | null;
};

export type UserTech = {
  /** UserTechレコード固有のID（更新・削除に使用） */
  id: string;
  /** 紐付いている技術スタックのマスター情報 */
  techStack: {
    id: string;
    name: string | null;
  };
  /** 経験開始時期 */
  startedAt: Date | null;
  /** 実績・メモ */
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
