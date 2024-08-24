import { ticketCloseMenu } from "./close.js";
import { ticketMainMenu } from "./main.js";
import { ticketPanelMenu } from "./panel.js";

export const ticketMenus = {
  main: ticketMainMenu,
  panel: ticketPanelMenu,
  close: ticketCloseMenu,
};
