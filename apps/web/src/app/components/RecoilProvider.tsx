"use client"
import { RecoilRoot } from "recoil";

export default function RecoilProvider({children}: {children: React.ReactNode}): JSX.Element {
  return <RecoilRoot>{children}</RecoilRoot>;
    
}