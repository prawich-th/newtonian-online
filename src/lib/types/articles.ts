export interface article {
  id: number;
  headline: string;
  content: string;
  cover: string;
  publishingDate: string;
  published: boolean;
  issueId: number;
  category: string;
  views: number;
  docId: string;
  member: memberinfo[];
}

export interface memberinfo {
  name: string;
  id: number;
  nickname: string;
  profile: string;
  year: number;
  track: string;
}
export interface issue {
  id: number;
  name: string;
  isSpecial: boolean;
  cover: string;
  publishingDate: string;
  published: boolean;
  lettersId: number;
  mainArticlesId: number;
  pdfLink: string;
  pdfViewCount: number;
  academic_year: string;
  articles: {
    id: number;
    headline: string;
    member: memberinfo[];
  }[];
  letter: {
    id: number;
    sender: string;
    content: string;
    letterSigner: {
      lettersId: number;
      membersId: number;
      signedAt: string;
      members: {
        signature: string;
        name: string;
        nickname: string;
        role: string;
      };
    }[];
  };
  authors?: memberinfo[];
  editors?: memberinfo[];
  graphics?: memberinfo[];
}
