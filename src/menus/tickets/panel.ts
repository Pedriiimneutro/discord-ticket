import { settings } from "#settings";
import { createEmbed, createRow } from "@magicyan/discord";
import { ButtonBuilder, ButtonStyle } from "discord.js";

export function ticketPanelMenu() {
  const embed = createEmbed({
    description:
      "Olá, seja bem vindo(a) ao seu ticket, para um melhor atendimento informe o motivo sobre seu contato",
    color: settings.colors.azoxo,
  });

  const row = createRow(
    new ButtonBuilder({
      customId: "ticket/button/close",
      style: ButtonStyle.Danger,
      label: "Fechar Ticket",
    })
  );

  return {
    embeds: [embed],
    components: [row],
  };
}
