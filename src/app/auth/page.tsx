import { NextPage } from "next";
import SupabaseAuth from "./SupabaseAuth";

interface Props {}

const Page: NextPage<Props> = ({}) => {
  return (
    <>
      <SupabaseAuth />
    </>
  );
};

export default Page;