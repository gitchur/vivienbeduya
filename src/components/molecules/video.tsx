import { getVideoAspectRatio } from "@/lib/videoOembed";
import { buildVideoEmbed } from "@/utils/videoEmbed";
import { VideoPlayer } from "./videoPlayer";

interface Props {
  data?: Sanity.Maybe<Partial<Sanity.Video>>;
  className?: string;
  sanityPath?: string;
}

export const Video = async ({
  data,
  className,
  sanityPath = "url",
}: Props): Promise<React.JSX.Element | null> => {
  if (!data?.url) return null;

  const embed = buildVideoEmbed(data.url, { autoplay: data.autoplay, loop: data.loop });
  if (!embed) return null;

  const meta = await getVideoAspectRatio(embed.oembedUrl);

  return (
    <VideoPlayer
      url={data.url}
      autoplay={data.autoplay}
      loop={data.loop}
      width={meta?.width}
      height={meta?.height}
      title={meta?.title}
      className={className}
      sanityPath={sanityPath}
    />
  );
};
