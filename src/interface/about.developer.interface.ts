import { ReactNode } from 'react';

export interface AboutDeveloperInterface {
  name: string;
  bio: string;
  avatar: string;
  socialMedias: AboutDeveloperSocialMediaInterface[];
}

interface AboutDeveloperSocialMediaInterface {
  name: string;
  url: string;
  icon: ReactNode;
}

// Path: src\interface\about.interface.ts
