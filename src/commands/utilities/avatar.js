import { ApplicationCommandType, ApplicationCommandOptionType, EmbedBuilder } from 'discord.js';
import { Command } from '../../structures/Command.js';
import { emjs } from '../../utils/Emojis.js';

export default class AvatarCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'avatar',
      description: '「🔧 Utilities」・Veja o avatar seu ou de outro usuário',
      type: ApplicationCommandType.ChatInput,
      options: [{ 
        name: 'usuário',
        description: '「🌆 Avatar」・Informe o usuário',
        type: ApplicationCommandOptionType.User
      }],
      devOnly: false,
    });
  }

  async execute({ interaction }) {
    let user = await interaction.options.getUser('usuário') || interaction.member;

    const rowAvatar = new ActionRowBuilder()
		  .addComponents(new ButtonBuilder().setLabel('Abra o avatar na web').setStyle(ButtonStyle.Link).setURL(user.displayAvatarURL({ dynamic: true, size: 4096 })))

    const embedAvatar = new EmbedBuilder()
      .setTitle(`:camera: ${user.tag}`)
      .setImage(user.displayAvatarURL({ dynamic: true, size: 4096 }))
      .setFooter({text: 'Bonito ou não é um avatar..'})
    interaction.reply({ embeds: [embedAvatar], components: [rowAvatar], fetchReply: true });
  }
}
