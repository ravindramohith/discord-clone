"use client";
import ActionTooltip from "../action-tooltip";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

const NavigationItem = (props: {
  id: String;
  imageUrl: String;
  name: String;
}) => {
  const { id, imageUrl, name } = props;
  const params = useParams();
  const router = useRouter();
  return (
    <ActionTooltip side="right" align="center" label={name}>
      <button
        onClick={() => {
          router.push(`/servers/${id}`);
        }}
        className="group relative flex items-center"
      >
        <div
          className={cn(
            "absolute left-0 bg-primary rounded-r-full transition-all w-[4px]",
            params?.serverId !== id && "group-hover:h-[20px]",
            params?.serverId === id ? "h-[36px]" : "h-[8px]"
          )}
        />
        <div
          className={cn(
            "relative group flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden",
            params?.serverId === id &&
              "bg-primary/10 text-primary rounded-[16px]"
          )}
        >
          <Image src={imageUrl} fill alt={name} />
        </div>
      </button>
    </ActionTooltip>
  );
};

export default NavigationItem;
