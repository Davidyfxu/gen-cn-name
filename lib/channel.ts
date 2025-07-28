import * as ChannelService from "@channel.io/channel-web-sdk-loader";

export const channelIO = async () => {
  await ChannelService.loadScript();
  await ChannelService.boot({
    pluginKey: "768b3c09-4470-44e2-b97d-b679e126ba8d", // fill your plugin key
  });
};
