"use client";

import UserLayout from "./user/layout";
import UserHomePage from "./user/home/page";

export default function Page() {
  return (
    <UserLayout>
      <UserHomePage />
    </UserLayout>
  );
}
