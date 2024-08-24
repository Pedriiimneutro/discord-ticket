import { Responder, ResponderType } from "#base";
import { res } from "#functions";
import { menus } from "#menus";
import { log } from "#settings";
import {
  createLinkButton,
  createRow,
  findChannel,
  sleep,
  toNull,
} from "@magicyan/discord";
import { ChannelType, TextChannel } from "discord.js";

new Responder({
  customId: "ticket/button/:action",
  cache: "cached",
  type: ResponderType.Button,
  async run(interaction, { action }) {
    await interaction.deferUpdate();

    const { guild, member } = interaction;

    const channelTicket = findChannel(guild).byName(`ticket-${member.id}`);

    switch (action) {
      case "open": {
        if (channelTicket) {
          const row = createRow(
            createLinkButton({
              url: channelTicket.url,
              label: "Ir Para Ticket",
            })
          );

          await interaction.followUp(
            res.primary("Desculpe, você já possui um ticket em aberto", {
              components: [row],
            })
          );
          return;
        }

        await guild.channels
          .create({
            name: `ticket-${member.id}`,
            type: ChannelType.GuildText,
            permissionOverwrites: [
              {
                id: guild.roles.everyone.id,
                deny: ["ViewChannel"],
                allow: [
                  "SendMessages",
                  "ReadMessageHistory",
                  "UseApplicationCommands",
                  "AttachFiles",
                  "EmbedLinks",
                ],
              },
              {
                id: member.id,
                allow: ["ViewChannel"],
              },
            ],
          })
          .then(async (channelTicketCreated) => {
            await channelTicketCreated
              .send(menus.ticket.panel())
              .then(async (message) => {
                const row = createRow(
                  createLinkButton({
                    url: message.url,
                    label: "Ir Para Ticket",
                  })
                );

                await interaction.followUp(
                  res.success("Parabéns, seu ticket foi aberto com sucesso", {
                    components: [row],
                  })
                );
              });
          })
          .catch(async (err) => {
            log.error(err);
            await interaction.followUp(
              res.danger("Desculpe, não possível criar seu ticket")
            );
          });
        return;
      }
      case "close": {
        if (!member.permissions.has("Administrator")) {
          await interaction.followUp(
            res.primary(
              "Desculpe, você não possui permissão para usar esse botão"
            )
          );
          return;
        }

        const channelTicket = interaction.channel as TextChannel;

        await interaction.editReply(menus.ticket.close()).then(async () => {
          await interaction.followUp(
            res.success("Parabéns, esse ticket foi fechado com sucesso")
          );
          await sleep(4000);
          await channelTicket.delete().catch(toNull());
        });
        return;
      }
    }
  },
});
