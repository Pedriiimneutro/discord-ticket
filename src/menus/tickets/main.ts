import { settings } from "#settings";
import { brBuilder, createEmbed, createRow } from "@magicyan/discord";
import { ButtonBuilder, ButtonStyle } from "discord.js";

export function ticketMainMenu() {
  const embed = createEmbed({
    description: brBuilder(
      "## Sistema de Tickets",
      "",
      "Para abrir seu ticket, clique no botão abaixo",
      "-# Por favor, não abrir ticket sem necessidade"
    ),
    color: settings.colors.azoxo,
  });

  const row = createRow(
    new ButtonBuilder({
      customId: "ticket/button/open",
      style: ButtonStyle.Primary,
      label: "Abrir Ticket",
    })
  );

  return {
    embeds: [embed],
    components: [row],
  };
}
