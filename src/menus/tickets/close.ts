import { settings } from "#settings";
import { createEmbed } from "@magicyan/discord";

export function ticketCloseMenu() {
  const embed = createEmbed({
    description: "Aviso: esse ticket será excluído em alguns segundos",
    color: settings.colors.warning,
  });

  return {
    embeds: [embed],
    components: [],
  };
}
