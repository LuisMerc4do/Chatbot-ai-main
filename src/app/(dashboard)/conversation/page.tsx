import { onGetAllAccountDomains } from "@/actions/settings";
import ConversationMenu from "@/components/conversations";
import Messenger from "@/components/conversations/messenger";
import InfoBar from "@/components/infobar";
import { Separator } from "@/components/ui/separator";
import { GetServerSideProps } from "next";
import React from "react";

// Define the expected shape of the 'domains' data
interface Domain {
  id: string;
  name: string;
  icon: string;
}

interface Props {
  domains: Domain[]; // Replace with the actual structure of the domains if different
}

const ConversationPage: React.FC<Props> = ({ domains }) => {
  return (
    <div className="w-full h-full flex">
      <ConversationMenu domains={domains} />

      <Separator orientation="vertical" />
      <div className="w-full flex flex-col">
        <div className="px-5">
          <InfoBar />
        </div>
        <Messenger />
      </div>
    </div>
  );
};

// getServerSideProps function to fetch data on the server side
export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const domainsData = await onGetAllAccountDomains();

    return {
      props: {
        domains: domainsData?.domains || [], // Provide an empty array as fallback
      },
    };
  } catch (error) {
    console.error("Error in getServerSideProps:", error);
    return {
      props: {
        domains: [], // Provide fallback data in case of error
      },
    };
  }
};

export default ConversationPage;
